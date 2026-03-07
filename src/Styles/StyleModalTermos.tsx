import { StyleSheet } from "react-native";
import { Colors } from "./colorsBase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 27,
    color: Colors.text,
    fontWeight: "500",
  },
  title2: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: "400",
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: "300",
    color: Colors.subtext,
  },
  svg: {
    marginLeft: 20,
    marginTop: 9,
  },
  svg2: {
    marginLeft: 10,
    marginTop: 7,
  },
  DivImage: {
    backgroundColor: Colors.black_gray,
    borderRadius: 5,
  },
  border: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.light_grayBorder,
  },
});

export default styles;
