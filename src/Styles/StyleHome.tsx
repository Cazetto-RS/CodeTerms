import { StyleSheet, Platform,  } from "react-native";
import { Colors } from "./colorsBase";

export const getStyles = (width) => {
  const isWeb = width > 768;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      alignItems: "center",
    },
    navBarDiv: {
      width: "100%",
      backgroundColor: Colors.black_gray,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: isWeb ? "row" : "column",
      gap: isWeb ? 30 : 0,
      paddingVertical: isWeb ? 10 : 0,
    },
    svgBar: {},
    image: {
      width: isWeb ? "10%" : "45%",
      marginTop: isWeb ? 0 : -15,
    },
    searchInput: {
      width: isWeb ? "100%" : "87%",
      color: Colors.subtext,
      borderWidth: 0,
      ...Platform.select({
        web: {
          outlineWidth: 0,
        }
      }),
      padding: 0,
    },
    searchDiv: {
      width: isWeb ? "50%" : "87%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      padding: 15,
      backgroundColor: Colors.gray,
      borderRadius: 5,
      marginVertical: isWeb ? 0 : 10,
      marginTop: isWeb ? 0 : -15,
    },
    border: {
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: Colors.light_grayBorder,
    },
    content: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      padding: 20,
    },
    titleDiv: {
      width: "95%",
      alignItems: "flex-start",
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: Colors.light_grayBorder,
      paddingBottom: 5,
    },
    title: {
      fontSize: 20,
      color: Colors.text,
      fontWeight: "500",
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "300",
      color: Colors.subtext,
    },
    description: {
      fontSize: 17,
      color: Colors.text,
      marginVertical: 17,
    },
    moreDiv: {
      width: "100%",
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: Colors.light_grayBorder,
    },
    more: {
      fontSize: 17,
      color: Colors.primary,
      marginTop: 10,
      cursor: "pointer",
    },
    Terms_MainDiv: {
      width: "100%",
      alignItems: "center",
    },
    TermsDiv: {
      width: "95%",
      backgroundColor: Colors.black_gray,
      height: "auto",
      borderRadius: 5,
      paddingHorizontal: 25,
      paddingVertical: 20,
    },
  });

}
