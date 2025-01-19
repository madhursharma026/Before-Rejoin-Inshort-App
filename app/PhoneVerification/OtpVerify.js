import {
  View,
  Text,
  Alert,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { APIURL } from "@env";
import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";
import UseDynamicStyles from "../../context/UseDynamicStyles";

const OtpVerify = () => {
  const router = useRouter();
  const inputRefs = useRef([]);
  const dynamicStyles = UseDynamicStyles();
  const { phoneNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    router.back();
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");
    if (otp.includes("")) {
      Alert.alert("Incomplete OTP", "Please enter all OTP digits.");
      return;
    }

    try {
      const response = await fetch(APIURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation VerifyOtp($phoneNumber: String!, $otpCode: String!) {
              verifyOtp(phoneNumber: $phoneNumber, otpCode: $otpCode) {
                success
                message
                data {
                  phoneNumber
                  sessionId
                }
              }
            }
          `,
          variables: { phoneNumber, otpCode },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0]?.message || "Unknown server error.");
      }

      const { success, message, data } = result.data.verifyOtp;
      if (success) {
        await AsyncStorage.setItem("loginUserSessionId", data.sessionId);
        await AsyncStorage.setItem("loginUserPhoneNumber", data.phoneNumber);
        Alert.alert("Success", "OTP Verified Successfully!");
        router.push("/onboarding");
      } else {
        Alert.alert(
          "Verification Failed",
          message || "Verification unsuccessful."
        );
      }
    } catch (error) {
      Alert.alert("Error", error.message || "An unexpected error occurred.");
    }
  };

  return (
    <SafeAreaView
      style={[
        tw`flex-1 bg-white justify-center items-center px-5`,
        dynamicStyles.backgroundColor,
      ]}
    >
      <StatusBar style="dark" />
      <View style={tw`mb-5`}>
        <Image
          source={{
            uri: "https://img.freepik.com/premium-vector/otp-authentication-secure-verification-never-share-otp-bank-details-concept_251235-482.jpg",
          }}
          style={tw`w-50 h-50 rounded-full`}
        />
      </View>
      <Text
        style={[
          tw`text-lg font-bold mb-2 text-center`,
          dynamicStyles.textColor,
        ]}
      >
        Enter Verification Code
      </Text>
      <Text style={tw`text-sm text-gray-500 text-center mb-8 px-2`}>
        We are automatically detecting an SMS sent to your mobile phone number
      </Text>
      <View style={tw`flex-row justify-between w-11/12 mb-5`}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={[
              tw`w-12 h-12 text-lg border border-gray-300 rounded-lg text-center`,
              dynamicStyles.textColor,
            ]} // Set text color to red
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOtpChange(index, value)}
          />
        ))}
      </View>

      <Text style={tw`text-sm text-gray-500 mb-8`}>
        Don’t receive the code?{" "}
        <Text style={tw`text-indigo-500 underline`} onPress={handleResendCode}>
          Resend Code
        </Text>
      </Text>
      <TouchableOpacity
        style={tw`w-4/5 bg-indigo-500 rounded-full py-4 items-center`}
        onPress={handleVerifyOtp}
      >
        <Text style={tw`text-white text-lg font-semibold`}>Verify</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OtpVerify;
