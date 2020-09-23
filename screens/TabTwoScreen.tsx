import React, { FC } from "react";
import { StyleSheet } from "react-native";

import { View } from "../components/Themed";
import QuotesList from "../components/QuotesList";

const TabTwoScreen: FC = () => {
  return (
    <View style={styles.container}>
      <QuotesList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TabTwoScreen;
