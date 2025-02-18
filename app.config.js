import "dotenv/config";

export default {
  expo: {
    name: process.env.APP_NAME,
    slug: process.env.APP_NAME,
    scheme: "inshortnews",
    newArchEnabled: true,
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "inshortnews",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.madhur_sharma026.inshortnews",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "a3124f6d-374d-4e5b-b3d3-2a24f3124477",
      },
    },
    runtimeVersion: "1.0.0",
    updates: {
      url: "https://u.expo.dev/a3124f6d-374d-4e5b-b3d3-2a24f3124477",
    },
  },
};
