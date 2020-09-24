import React, { ReactElement, useEffect } from "react";
import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import { getQuotes, getMoreRenderQuotes } from "../redux/ducks/quotes/index";
import { AppState } from "../redux/ducks";
import { View } from "./Themed";
import { Quotes } from "../redux/ducks/quotes/types";
import QuoteView from "./QuoteView";
import QuoteListHeader from "./QuoteListHeader";
import QuoteListError from "./QuoteListError";
import { timeoutRequest } from "../constants";

export default function QuotesList(): ReactElement {
  const renderQuotes = useSelector(
    (state: AppState) => state.quotes.renderQuotes
  );
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      const id = setInterval(() => {
        dispatch(getQuotes());
      }, timeoutRequest);
      return () => {
        clearInterval(id);
      };
    }, [])
  );

  useEffect(() => {
    dispatch(getQuotes());
  }, []);

  const onEndReached = (): void => {
    if (renderQuotes.length > 0) {
      dispatch(getMoreRenderQuotes());
    }
  };

  return (
    <View style={styles.wrapper}>
      <QuoteListError />
      {renderQuotes.length === 0 && (
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
      {renderQuotes.length > 0 && (
        <>
          <QuoteListHeader />
          <FlatList
            data={renderQuotes}
            extraData={renderQuotes}
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
