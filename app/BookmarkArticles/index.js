import tw from "twrnc";
import { useRouter } from "expo-router";
import React, { useCallback, memo } from "react";
import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { Text, View, Dimensions, Button } from "react-native";
import UseDynamicStyles from "../../context/UseDynamicStyles";
import { useSavedArticles } from "../../context/BookmarkedArticleContext";
import BookmarkedSingleArticle from "../../components/BookmarkSingleArticles";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const BookmarkArticle = () => {
  const router = useRouter();
  const dynamicStyles = UseDynamicStyles();
  const { savedArticles, toggleSaveArticle } = useSavedArticles(); // Updated context variables

  const animationStyle = useCallback(
    (value, direction = "bottomToTop") => {
      "worklet";
      let translateY;
      if (direction === "topToBottom") {
        translateY = interpolate(value, [-1, 0, 1], [windowHeight, 0, 0]);
      } else if (direction === "bottomToTop") {
        translateY = interpolate(value, [-1, 0, 1], [-windowHeight, 0, 0]);
      }
      const scale = interpolate(value, [-1, 0, 1], [1, 1, 0.85]);
      const zIndex = interpolate(value, [-1, 0, 1], [300, 0, -300]);
      return {
        transform: [{ translateY }, { scale }],
        zIndex: Math.round(zIndex),
      };
    },
    [windowHeight]
  );

  const StatusMessage = memo(({ message }) => (
    <View style={tw`items-center`}>
      <Text style={[tw`text-xl text-center mb-4`, dynamicStyles.textColor]}>
        {message}
      </Text>
      <Button title="Home Page" onPress={() => router.back()} />
    </View>
  ));

  const renderContent = () =>
    savedArticles.length === 0 ? ( // Updated to savedArticles
      <StatusMessage message="There are no saved articles" />
    ) : (
      // <Carousel
      //   loop={false}
      //   mode="stack"
      //   vertical
      //   data={savedArticles} // Updated to savedArticles
      //   width={windowWidth}
      //   height={windowHeight}
      //   renderItem={({ item, index }) => (
      <BookmarkedSingleArticle item={savedArticles} />
      // )}
      // customAnimation={animationStyle}
      // />
    );

  return (
    <View
      style={[
        dynamicStyles.backgroundColor,
        tw`flex-1 justify-center items-center`,
      ]}
    >
      {renderContent()}
    </View>
  );
};

export default BookmarkArticle;
