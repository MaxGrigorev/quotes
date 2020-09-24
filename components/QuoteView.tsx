import React, { FC } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View, AnimatedText } from "./Themed";
import { Quotes } from "../redux/ducks/quotes/types";

interface Props {
  quote: Quotes;
}

const QuoteView: FC<Props> = ({ quote }) => {
  const { name, last, highestBid, percentChange } = quote;

  const numberPercentChange = parseFloat(percentChange);

  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        padding: 8,
      }}
    >
      <View
        style={{
          flex: 3,
        }}
      >
        <Text
          style={styles.name}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          {name}
        </Text>
      </View>
      <View
        style={{
          flex: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <AnimatedText
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
            value={parseFloat(last)}
          >
            {last}
          </AnimatedText>
          <Text
            style={styles.highestBid}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            {highestBid}
          </Text>
        </View>
        <View
          style={{
            width: 70,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              numberPercentChange > 0
                ? "rgba(162, 239, 0, 0.4)"
                : "rgba(255, 0, 0, 0.4)",
          }}
        >
          <Text
            style={styles.percentChange}
            lightColor={
              numberPercentChange > 0
                ? "rgba(62, 92, 0, 1)"
                : "rgba(255, 0, 0, 1)"
            }
            darkColor="rgba(255,255,255,0.8)"
          >
            {`${
              numberPercentChange >= 0 ? "+" : ""
            }${numberPercentChange.toFixed(2)} %`}
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
    fontSize: 17,
  },
  highestBid: {
    fontSize: 10,
  },
  percentChange: {
    fontSize: 15,
  },
});

export default QuoteView;
