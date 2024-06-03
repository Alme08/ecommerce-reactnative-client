import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Footer from "./Footer";
import { StatusBar } from "expo-status-bar";

const Layout = ({ children }) => {
  return (
    <>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.container}>
        <View>{children}</View>
      </ScrollView>
      <View style={styles.footer}>
        <Footer />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    display: "flex",
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    borderColor: "lightgray",
    zIndex: 100,
    borderWidth: 1,
    position: "absolute",
    bottom: 0,
    padding: 10,
    backgroundColor: "white",
  },
});

export default Layout;
