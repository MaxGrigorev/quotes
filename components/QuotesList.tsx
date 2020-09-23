import React, { ReactElement, useState, useEffect } from "react";
import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import { getQuotes } from "../redux/ducks/quotes/index";
import { AppState } from "../redux/ducks";
import { View } from "./Themed";
import { Quotes } from "../redux/ducks/quotes/types";
import QuoteView from "./QuoteView";
import QuoteListHeader from "./QuoteListHeader";
import QuoteListError from "./QuoteListError";

export default function QuotesList(): ReactElement {
  const quotes = useSelector((state: AppState) => state.quotes.quotes);
  const [quotesLocal, setQuotesLocal] = useState(quotes);

  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      const id = setInterval(() => {
        dispatch(getQuotes());
      }, 10000);
      return () => {
        clearInterval(id);
      };
    }, [])
  );

  useEffect(() => {
    dispatch(getQuotes());
  }, []);

  useEffect(() => {
    setQuotesLocal(() => quotes.slice(0, quotesLocal.length || 15));
  }, [quotes]);

  const fetchMoreData = (limit: number): void => {
    setQuotesLocal(() => quotes.slice(0, quotesLocal.length + limit));
  };

  const onEndReached = (): void => {
    if (quotes.length > 0) {
      fetchMoreData(15);
    }
  };

  return (
    <View style={styles.wrapper}>
      <QuoteListError />
      {quotesLocal.length === 0 && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0)",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
      {quotesLocal.length > 0 && (
        <>
          <QuoteListHeader />
          <FlatList
            data={quotesLocal}
            extraData={quotesLocal}
            keyExtractor={(item: Quotes, index: number): string =>
              `${item.id} ${index}`
            }
            renderItem={({ item }: { item: Quotes }) => {
              return <QuoteView quote={item} />;
            }}
            onEndReachedThreshold={0.5}
            refreshing={false}
            onEndReached={onEndReached}
            ItemSeparatorComponent={() => (
              <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
              />
            )}
          />
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  separator: {
    height: 1,
  },
});
