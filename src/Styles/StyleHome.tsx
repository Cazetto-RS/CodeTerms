import { StyleSheet, Platform } from "react-native";

export const Colors = {
  primary: "#1A80B6",
  secondary: "#066899",
  third: "#01476B",
  background: "#F5F7FA",
  navBar: "#FFFFFF",
  gray: "#FFFFFF",
  light_gray: "#c0c0c0",
  light_grayBorder: "#E5E8EF",
  black: "#131417",
  black_gray: "#FFFFFF",
  text: "#131417",
  subtext: "#5A5F6E",
};

export const getStyles = (width: number) => {
  const isWeb = width > 768;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      overflow: "hidden"
    },

    // ─── Área de conteúdo ──────────────────────────────────────────────────
    content: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      paddingHorizontal: isWeb ? 32 : 16,
      paddingTop: 28,
    },

    // ─── Busca ─────────────────────────────────────────────────────────────
    searchDiv: {
      width: isWeb ? "60%" : "100%",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      gap: 10,
      paddingHorizontal: 16,
      paddingVertical: 11,
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#D8DCE6",
      marginBottom: isWeb ? -38 : 28,
      zIndex: 999,
      ...Platform.select({
        web: { boxShadow: "0 1px 3px rgba(0,0,0,0.05)" },
      }),
    },
    searchInput: {
      flex: 1,
      color: Colors.text,
      fontSize: 14,
      borderWidth: 0,
      ...Platform.select({
        web: { outlineWidth: 0 },
      }),
    },

    // ─── Cabeçalho da seção ────────────────────────────────────────────────
    titleDiv: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      paddingBottom: 12,
    },
    title: {
      fontSize: 15,
      color: Colors.text,
      fontWeight: "600",
    },

    // ─── Cards ─────────────────────────────────────────────────────────────
    Terms_MainDiv: {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 14,
    },
    TermsDiv: {
      width: isWeb ? "31.5%" : "100%",
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: Colors.light_grayBorder,
      paddingHorizontal: 20,
      paddingVertical: 20,
      ...Platform.select({
        web: {
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
          transition: "box-shadow .18s, transform .18s",
          cursor: "pointer",
        },
      }),
    },
    cardTag: {
      fontSize: 10,
      fontWeight: "600",
      color: Colors.primary,
      textTransform: "uppercase",
      letterSpacing: 0.6,
      marginBottom: 8,
      opacity: 0.7,
    },
    subtitle: {
      fontSize: 13,
      color: Colors.primary,
      fontWeight: "500",
      marginBottom: 10,
    },
    description: {
      fontSize: 13,
      color: Colors.subtext,
      lineHeight: 20,
      marginBottom: 14,
      borderBottomWidth: 1,
      borderBottomColor: "#F0F2F6",
      paddingBottom: 12,
    },
    moreDiv: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    more: {
      fontSize: 13,
      color: Colors.primary,
      fontWeight: "500",
      ...Platform.select({ web: { cursor: "pointer" } }),
    },

    // ─── Paginação ─────────────────────────────────────────────────────────
    BotaoPagina: {
      color: Colors.primary,
      fontSize: 16,
      fontWeight: "600",
    },
    TextoPaginacao: {
      color: Colors.text,
      fontWeight: "500",
      fontSize: 13,
    },
    Paginacao: {
      width: 36,
      height: 36,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#D8DCE6",
      backgroundColor: "#FFFFFF",
    },

    // ─── Utilitário ────────────────────────────────────────────────────────
    border: {
      borderWidth: 1,
      borderColor: Colors.light_grayBorder,
    },
    svgBar: {},
  });
};
