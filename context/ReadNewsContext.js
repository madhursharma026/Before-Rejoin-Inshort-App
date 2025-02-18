import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect, useContext } from "react";

const ReadNewsContext = createContext();

// Custom hook to use the ReadNewsContext
export const useReadNews = () => useContext(ReadNewsContext);

// Provider component to manage read articles state
export const ReadNewsProvider = ({ children }) => {
  const [readArticles, setReadArticles] = useState([]);

  useEffect(() => {
    const loadReadNews = async () => {
      try {
        const storedReadNews = await AsyncStorage.getItem("readArticles");
        if (storedReadNews) {
          setReadArticles(JSON.parse(storedReadNews));
        }
      } catch (error) {
        console.error("Failed to load read news:", error);
      }
    };

    loadReadNews();
  }, []);

  useEffect(() => {
    const saveReadNews = async () => {
      try {
        await AsyncStorage.setItem(
          "readArticles",
          JSON.stringify(readArticles)
        );
      } catch (error) {
        console.error("Failed to save read news:", error);
      }
    };

    saveReadNews();
  }, [readArticles]);

  const toggleReadNews = (article) => {
    setReadArticles((prev) => {
      const isRead = prev.some((a) => a.url === article.url);
      return isRead
        ? prev.filter((a) => a.url !== article.url)
        : [...prev, article];
    });
  };

  return (
    <ReadNewsContext.Provider value={{ readArticles, toggleReadNews }}>
      {children}
    </ReadNewsContext.Provider>
  );
};
