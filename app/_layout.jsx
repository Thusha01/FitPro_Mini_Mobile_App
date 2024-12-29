import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";

const Layout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {/* Use Stack for navigation */}
      <Stack
        screenOptions={{
          headerShown: false, // Hide headers globally
          animation: "fade",  // Smooth transitions between screens
        }}
      />
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Customize your background color if needed
  },
});
