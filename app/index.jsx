import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { Link } from "expo-router";

const LandingScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/cover.jpg")} style={styles.bannerImage} />
      <Text style={styles.title}>Welcome to FitPro</Text>
      <Text style={styles.subTitle}>
        Transform Your Fitness Goals Into Reality – 
        Join Us Today and Elevate Your Health Journey!
      </Text>
      <View style={styles.buttonContainer}>
        <Link href="/login" style={[styles.button, styles.loginButton]}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Link>
        <Link href="/signup" style={[styles.button, styles.signupButton]}>
          <Text style={styles.signupButtonText}>Sign-up</Text>
        </Link>
      </View>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  bannerImage: {
    marginBottom: 30,
    height: 355,
    width: 400,
    resizeMode: "cover",
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
    textAlign: "center",
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 16,
    fontFamily: fonts.Medium,
    color: colors.secondary,
    textAlign: "center",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginHorizontal: 5,
  },
  loginButton: {
    backgroundColor: colors.primary,
  },
  signupButton: {
    backgroundColor: colors.secondary,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
    textAlign: "center",
  },
  signupButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
    textAlign: "center",
  },
});
