import tw from "twrnc";
import React from "react";
import Article from "../../components/Article";
import { useLocalSearchParams, useRouter } from "expo-router";

const SingleArticle = () => {
  const router = useRouter();
  const { title, imageURL, description, articleId } = useLocalSearchParams();

  return (
    <Article
      title={title}
      style={tw`p-4`}
      imageURL={imageURL}
      description={description}
      articleId={articleId}
      onBackPress={router.back}
    />
  );
};

export default SingleArticle;
