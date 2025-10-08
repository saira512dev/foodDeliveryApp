import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setisSubmitting] = useState(false);
  const [form, setform] = useState({ email: "", password: "" });

  const submit = async () => {
    if (!form.email || !form.password)
      Alert.alert("Error", "Please enter valid email and password");

    setisSubmitting(true);

    try {
      Alert.alert("Success", "User Signed In Successfully");
      router.replace("/");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <View className="gap-10 bg-white rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your email"
        value={""}
        onChangeText={(text) => {}}
        label="email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={""}
        onChangeText={(text) => {}}
        label="password"
        secureTextEntry={true}
      />
      <CustomButton title="Sign In" />
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don't have an account?
        </Text>
        <Link href="/sign-up" className="base-bold text-primary">
          Sign Up
        </Link>
      </View>
    </View>
  );
};

export default SignIn;
