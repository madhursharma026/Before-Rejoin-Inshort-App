import tw from "twrnc";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import UseDynamicStyles from "../../context/UseDynamicStyles";

const TermsOfService = () => {
  const dynamicStyles = UseDynamicStyles();

  // Function to render styled text
  const renderText = (content, style = null) => (
    <Text
      style={[tw`text-base leading-6 mb-4`, dynamicStyles.textColor, style]}
    >
      {content}
    </Text>
  );

  // Function to render styled list items
  const renderListItem = (content) => (
    <Text style={[tw`text-base mb-1`, dynamicStyles.textColor]}>
      • {content}
    </Text>
  );

  return (
    <ScrollView
      style={tw`flex-1`}
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[tw`flex-grow p-4`, dynamicStyles.backgroundColor]}
    >
      <View>
        {/* Title Section */}
        <Text
          style={[
            tw`text-3xl font-bold mb-4 text-center underline`,
            dynamicStyles.textColor,
          ]}
        >
          Terms of Service
        </Text>

        {/* Main Content Section */}
        {renderText(
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt nunc lorem, eget bibendum nisl malesuada a. Nulla facilisi. Suspendisse potenti. Ut id enim nec ipsum consequat scelerisque. Suspendisse potenti. Phasellus in justo non nisi lacinia efficitur. Donec et sapien in elit vulputate fermentum. Fusce in arcu non nisi blandit placerat."
        )}
        {renderText(
          "Curabitur vel ligula euismod, suscipit augue in, accumsan nisi. Nulla facilisi. In hac habitasse platea dictumst. Curabitur eget tincidunt lorem, id vulputate tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse potenti. Phasellus in justo non nisi lacinia efficitur."
        )}

        {/* Key Points Section */}
        <Text
          style={[
            tw`text-2xl font-bold mb-2 text-center underline`,
            dynamicStyles.textColor,
          ]}
        >
          Key Points:
        </Text>
        <View style={tw`ml-4 mb-4`}>
          {[
            "Lorem ipsum dolor sit amet",
            "Consectetur adipiscing elit",
            "Proin tincidunt nunc lorem",
            "Nulla facilisi",
            "Suspendisse potenti",
          ].map(renderListItem)}
        </View>

        {/* Final Paragraph */}
        {renderText(
          "Curabitur vel ligula euismod, suscipit augue in, accumsan nisi. Nulla facilisi. In hac habitasse platea dictumst. Curabitur eget tincidunt lorem, id vulputate tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse potenti. Phasellus in justo non nisi lacinia efficitur."
        )}

        {/* Separator */}
        <Text
          style={[tw`text-base text-center mt-4 mb-8`, dynamicStyles.textColor]}
        >
          ---------------------------------------------------
        </Text>
      </View>
    </ScrollView>
  );
};

export default TermsOfService;
