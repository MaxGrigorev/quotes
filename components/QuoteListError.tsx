import React, { FC, useEffect, useRef } from "react";
import { StyleSheet, Animated } from "react-native";
import { useSelector } from "react-redux";
import { AppState } from "../redux/ducks";

import { Text, View } from "./Themed";

const QuoteListError: FC = () => {
  const error = useSelector((state: AppState) => state.quotes.error);

  const height = useRef(new Animated.Value(-40)).current;

  const animStart = () => {
    Animated.timing(height, {
      toValue: -40,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const animEnd = () => {
    Animated.timing(height, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (error) {
      animEnd();
    } else {
      animStart();
    }
  });

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          transform: [{ translateY: height }],
        },
      ]}
    >
      <View style={styles.wrapper}>
        <Text
          style={styles.text}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Error
        </Text>
      </View>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FF0000",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
  },
  text: {
    fontSize: 17,
  },
});

export default QuoteListError;
