import tw from "twrnc";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { ReadNewsProvider } from "../context/ReadNewsContext";
import { LanguageProvider } from "../context/LanguageContext";
import { BookmarkProvider } from "../context/BookmarkContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { StatusBar, View, LogBox, SafeAreaView, Platform } from "react-native";
import { ArticleProvider } from "../context/BookmarkedArticleContext";

const Layout = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <SafeAreaProvider style={tw`flex-1`}>
      <SafeAreaView style={{ flex: 1 }}>
        <ThemeProvider>
          <LanguageProvider>
            <BookmarkProvider>
              <ArticleProvider>
                <ReadNewsProvider>
                  <ThemedLayout />
                </ReadNewsProvider>
              </ArticleProvider>
            </BookmarkProvider>
          </LanguageProvider>
        </ThemeProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const ThemedLayout = () => {
  const { isDarkMode } = useTheme();
  const backgroundColor = isDarkMode ? "#282C35" : "#FFFFFF";
  const barStyle = isDarkMode ? "light-content" : "dark-content";

  return (
    <>
      <View
        style={[
          {
            backgroundColor,
            height: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
          },
          tw`w-full`,
        ]}
      />
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      <SafeAreaView style={[{ backgroundColor }, tw`flex-1`]}>
        <Stack
          screenOptions={{
            animation: "fade",
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="LinkViewer/index"
            options={{
              presentation: "modal",
              gestureDirection: "vertical",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="Profile/index" />
          <Stack.Screen name="ReadNews/index" />
          <Stack.Screen
            name="ContactUs/index"
            options={{
              headerShown: true, // Show header specifically for this page
              title: "", // Set header title
              headerStyle: {
                backgroundColor: isDarkMode ? "#282C35" : "#FFFFFF", // Dynamic background
              },
              headerTintColor: isDarkMode ? "#FFFFFF" : "#000000", // Dynamic text color
            }}
          />
          <Stack.Screen name="SingleNews/index" />
          <Stack.Screen name="PhoneVerification" />
          <Stack.Screen name="ImageViewer/index" />
          <Stack.Screen name="BookmarkNews/index" />
          <Stack.Screen name="BookmarkArticles/index" />
          <Stack.Screen
            name="SingleArticle/index"
            options={{
              presentation: "modal",
              gestureDirection: "vertical",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen name="TermsOfService/index" />
          <Stack.Screen name="SingleNewsById/index" />
          <Stack.Screen name="SingleArticleById/index" />
        </Stack>
      </SafeAreaView>
    </>
  );
};

export default Layout;
