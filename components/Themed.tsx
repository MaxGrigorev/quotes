import React, { FC, useRef, useEffect } from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  Animated,
  StyleSheet,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export const useThemeColor = (
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
): string => {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
};

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type AnimatedTextProps = ThemeProps & { value: number };

export const Text: FC<TextProps> = (props) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};

export const View: FC<ViewProps> = (props) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};

export const AnimatedText: FC<AnimatedTextProps> = (props) => {
  const { lightColor, darkColor, value = 0, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const prevValue = useRef(props.value);
  const animation = useRef(new Animated.Value(1)).current;

  const handleAnimationRed = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    });
  };

  const handleAnimationGreen = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    });
  };

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ["rgb(0,225,0)", color, "rgb(224,0,0)"],
  });
  const animatedStyle = {
    color: boxInterpolation,
  };

  useEffect(() => {
    if (prevValue.current > value) handleAnimationRed();
    if (prevValue.current < value) handleAnimationGreen();
    prevValue.current = value;
  }, [value]);

  return (
    <Animated.Text
      {...otherProps}
      style={{ ...styles.wrapper, ...animatedStyle }}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    fontSize: 17,
  },
});
