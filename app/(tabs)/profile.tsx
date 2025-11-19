import CustomButton from "@/components/CustomButton";
import { signOut } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";
import * as Sentry from "@sentry/react-native";
import React from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { fetchAuthenticatedUser } = useAuthStore();

  const handleLogout = async () => {
    try {
      await signOut();
      await fetchAuthenticatedUser();
    } catch (error: any) {
      Alert.alert("Error", error.message);
      Sentry.captureEvent(error);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <CustomButton title="Logout" onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
