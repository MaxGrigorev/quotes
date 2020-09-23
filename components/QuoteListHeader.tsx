import React, { FC } from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "./Themed";

const QuoteListHeader: FC = () => {
  return (
    <View
      style={{
        // height: 20,
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
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Name
        </Text>
      </View>
      <View
        style={{
          flex: 5,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Last / Highest Bid
        </Text>
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Percent Change
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
  },
  text: {
    fontSize: 10,
  },
});

export default QuoteListHeader;
