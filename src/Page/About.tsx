import React from 'react';
import { View, useWindowDimensions, ScrollView } from 'react-native';

import { getStyles } from "../Styles/StyleHome";

export default function About() {
  const { width } = useWindowDimensions();
  const styles = getStyles(width);

  return <View style={styles.container}></View>;
}