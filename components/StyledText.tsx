import React, { FC } from "react";

import { Text, TextProps } from "./Themed";

export const MonoText: FC = (props: TextProps) => {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
};
