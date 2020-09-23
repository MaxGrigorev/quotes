import React, { FC } from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "./Themed";

const EditScreenInfo: FC = () => {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          This is test application
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
});

export default EditScreenInfo;
