// import { Redirect } from "expo-router";
// import React, { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ActivityIndicator, View } from "react-native";
// import tw from "twrnc";

// export default function Index() {
//   const [isUserLogin, setIsUserLogin] = useState(null);
//   const [isFirstLaunch, setIsFirstLaunch] = useState(null);

//   useEffect(() => {
//     const checkUserStatus = async () => {
//       try {
//         // Check login status
//         const userSessionId = await AsyncStorage.getItem("loginUserSessionId");
//         setIsUserLogin(userSessionId !== null);

//         // Check if first launch
//         const hasLaunched = await AsyncStorage.getItem("hasLaunched");
//         setIsFirstLaunch(hasLaunched === null);
//       } catch (error) {
//         console.error("Error checking user status:", error);
//       }
//     };

//     checkUserStatus();
//   }, []);

//   if (isFirstLaunch === null || isUserLogin === null) {
//     return (
//       <View style={tw`flex-1 justify-center items-center`}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (isUserLogin) {
//     return <Redirect href={isFirstLaunch ? "/onboarding" : "/(tabs)"} />;
//   } else {
//     return <Redirect href="/PhoneVerification" />;
//   }
// }

import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/(tabs)" />;
}
