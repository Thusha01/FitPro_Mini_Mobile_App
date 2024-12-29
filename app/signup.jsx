import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignupScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "", // Added username to formData
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [secureEntry, setSecureEntry] = useState({
    password: true,
    confirmPassword: true,
  });

  const handleGoBack = () => {
    router.back(); // Go to the previous screen
  };

  const handleLogin = () => {
    router.push("/login"); // Navigate to the Login screen
  };

  const handleSignup = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Submitted", { ...formData });

      // Save user data to AsyncStorage
      try {
        await AsyncStorage.setItem("userData", JSON.stringify(formData));
        console.log("User registered successfully!");

        // Navigate to login screen after successful registration
        router.push("/login");

        // Optionally, display success message (using alert or any other method)
        alert("Successfully registered! Please login.");
      } catch (error) {
        console.error("Error saving data:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.username) {
      errors.username = "Username is required.";
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!formData.password || formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number.";
    }
    return errors;
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Let's get</Text>
        <Text style={styles.headingText}>started</Text>
      </View>
      <View style={styles.formContainer}>
        {/* Username */}
        <View style={styles.inputContainer}>
          <Ionicons name={"person-outline"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your username"
            placeholderTextColor={colors.secondary}
            value={formData.username}
            onChangeText={(text) => setFormData({ ...formData, username: text })}
          />
        </View>
        {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}

        {/* Email */}
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        {/* Password */}
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry.password}
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
          />
          <TouchableOpacity
            onPress={() =>
              setSecureEntry((prev) => ({ ...prev, password: !prev.password }))
            }
          >
            <SimpleLineIcons
              name={secureEntry.password ? "eye" : "eye-off"}
              size={20}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        {/* Confirm Password */}
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm your password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry.confirmPassword}
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData({ ...formData, confirmPassword: text })
            }
          />
          <TouchableOpacity
            onPress={() =>
              setSecureEntry((prev) => ({
                ...prev,
                confirmPassword: !prev.confirmPassword,
              }))
            }
          >
            <SimpleLineIcons
              name={secureEntry.confirmPassword ? "eye" : "eye-off"}
              size={20}
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword}</Text>
        )}

        {/* Phone */}
        <View style={styles.inputContainer}>
          <SimpleLineIcons
            name={"screen-smartphone"}
            size={30}
            color={colors.secondary}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your phone no"
            placeholderTextColor={colors.secondary}
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(text) =>
              setFormData({ ...formData, phone: text })
            }
          />
        </View>
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        {/* Signup Button */}
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleSignup}
        >
          <Text style={styles.loginText}>Sign up</Text>
        </TouchableOpacity>

        {/* Google signup */}
        <Text style={styles.continueText}>or continue with</Text>
        <TouchableOpacity style={styles.googleButtonContainer}>
          <Image
            source={require("../assets/google.png")}
            style={styles.googleImage}
          />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 15,
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: "center",
    padding: 10,
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.primary,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.primary,
    fontFamily: fonts.Regular,
  },
  signupText: {
    color: colors.primary,
    fontFamily: fonts.Bold,
  },
});
