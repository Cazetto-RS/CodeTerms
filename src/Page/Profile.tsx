import React from "react";
import { useWindowDimensions, View, ScrollView } from "react-native";

import { getStyles } from "../Styles/StyleHome";

export default function Profile() {
  const { width } = useWindowDimensions();
  const styles = getStyles(width);

  return <View style={styles.container}></View>;
}
