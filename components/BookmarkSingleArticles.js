import React from "react";
import { useRouter } from "expo-router";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useSavedArticles } from "../context/BookmarkedArticleContext";
import UseDynamicStyles from "../context/UseDynamicStyles";
import { formatDistanceToNow } from "date-fns";

const BookmarkSingleArticles = () => {
  const { savedArticles } = useSavedArticles(); // Access saved articles from context
  const dynamicStyles = UseDynamicStyles();
  const router = useRouter();

  const stripHTMLTags = (htmlContent) => {
    return htmlContent.replace(/<\/?[^>]+(>|$)/g, ""); // Regex to remove HTML tags
  };

  return (
    <ScrollView
      contentContainerStyle={[
        tw`flex-grow p-2.5 pb-16`,
        dynamicStyles.backgroundColor,
      ]}
    >
      <View style={tw`flex-1 p-2.5`}>
        <Text
          style={[
            tw`text-3xl pb-4 font-bold text-center`,
            dynamicStyles.textColor,
            { textDecorationLine: "underline" },
          ]}
        >
          Bookmarked Articles
        </Text>

        {savedArticles.length === 0 ? (
          <View
            style={[
              tw`flex-1 justify-center items-center`,
              dynamicStyles.backgroundColor,
            ]}
          >
            <Text
              style={[tw`text-gray-500 text-xl mb-4`, dynamicStyles.textColor]}
            >
              No bookmarked articles yet.
            </Text>
          </View>
        ) : (
          savedArticles.map((article) => (
            <TouchableOpacity
              key={article.articleId}
              onPress={() =>
                router.push({
                  pathname: "/SingleArticle",
                  params: {
                    title: article.title,
                    imageURL: article.imageURL,
                    description: article.description,
                    articleId: article.articleId,
                  },
                })
              }
              activeOpacity={1}
              style={tw`mb-4`}
            >
              <View
                style={tw`bg-white rounded-xl p-4 mb-4 shadow-lg shadow-blue-500`}
              >
                <View style={tw`flex-row`}>
                  <View style={tw`flex-1 pr-4`}>
                    <Text
                      style={[
                        tw`text-lg font-semibold mb-2`,
                        dynamicStyles.textColor,
                      ]}
                      numberOfLines={3}
                    >
                      {article.title}
                    </Text>
                  </View>
                  <Image
                    source={{ uri: article.imageURL }}
                    style={tw`w-16 h-16`}
                  />
                </View>
                <View style={tw`mt-2`}>
                  <Text
                    style={[tw`text-base mb-2`, dynamicStyles.textColor]}
                    numberOfLines={5}
                  >
                    {stripHTMLTags(article.description)}
                  </Text>
                </View>
                {/* <Text style={tw`text-xs text-gray-500 mt-2`}>
                  {formatDistanceToNow(new Date(article.createdAt), {
                    addSuffix: true,
                  })}
                </Text> */}
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default BookmarkSingleArticles;
