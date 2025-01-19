import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect, useContext } from "react";

const ArticleContext = createContext();
export const useSavedArticles = () => useContext(ArticleContext);

export const ArticleProvider = ({ children }) => {
  const [savedArticles, setSavedArticles] = useState([]);

  // Load saved articles from AsyncStorage when the component mounts
  useEffect(() => {
    const loadSavedArticles = async () => {
      try {
        const storedArticles = await AsyncStorage.getItem("savedArticles");
        if (storedArticles) {
          setSavedArticles(JSON.parse(storedArticles));
        }
      } catch (error) {
        console.error("Failed to load saved articles:", error);
      }
    };
    loadSavedArticles();
  }, []);

  // Save the saved articles to AsyncStorage whenever it changes
  useEffect(() => {
    const saveSavedArticles = async () => {
      try {
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticles)
        );
      } catch (error) {
        console.error("Failed to save saved articles:", error);
      }
    };
    saveSavedArticles();
  }, [savedArticles]);

  // Toggle save/unsave an article
  const toggleSaveArticle = (article) => {
    setSavedArticles((prev) => {
      const isSaved = prev.some((a) => a.articleId === article.articleId); // Check by articleId
      return isSaved
        ? prev.filter((a) => a.articleId !== article.articleId) // Remove the article
        : [...prev, article]; // Add the article
    });
  };

  return (
    <ArticleContext.Provider value={{ savedArticles, toggleSaveArticle }}>
      {children}
    </ArticleContext.Provider>
  );
};
