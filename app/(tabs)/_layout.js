import tw from "twrnc";
import { Tabs } from "expo-router";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function Layout() {
  const screenOptions = {
    tabBarLabel: "",
    headerShown: false,
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: tw`absolute bottom-0 left-0 right-0 bg-black h-12`,
      }}
    >
      <Tabs.Screen
        name="discover"
        options={{
          ...screenOptions,
          title: "Discover",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons
              size={18}
              color={color}
              style={tw`pt-2`}
              name="magnifier"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          ...screenOptions,
          title: "Feeds",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons
              size={18}
              color={color}
              name="notebook"
              style={tw`pt-2`}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          ...screenOptions,
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons
              size={18}
              color={color}
              name="settings"
              s
              style={tw`pt-2`}
            />
          ),
        }}
      />
    </Tabs>
  );
}
