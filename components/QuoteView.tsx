import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "./Themed";
import { Quotes } from "../redux/ducks/quotes/types";

const normalizePercent = (percent: string): string => {
  if (percent[0] === "-") return percent + " %";

  return;
};

interface Props {
  quote: Quotes;
}

const QuoteView: FC<Props> = ({ quote }) => {
  const { name, last, highestBid, percentChange } = quote;

  const numberPercentChange = parseFloat(percentChange).toFixed(2);

  return (
    <TouchableOpacity
      onPress={() => {}}
      style={{
        flexDirection: "row",
        padding: 8,
        justifyContent: "space-between",
      }}
    >
      <Text
        style={styles.name}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(255,255,255,0.8)"
      >
        {name}
      </Text>
      <View
        style={{
          flex: 4,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text
            style={styles.last}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            {last}
          </Text>
          <Text
            style={styles.highestBid}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            {highestBid}
          </Text>
        </View>
        <View>
          <Text
            style={styles.getStartedText}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            {`${numberPercentChange} %`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
  },
  name: {
    flex: 3,
    fontSize: 17,
  },
  last: {
    fontSize: 17,
  },
  highestBid: {
    fontSize: 10,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
});

export default QuoteView;
