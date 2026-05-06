import { StyleSheet, Platform } from "react-native";
import { Colors } from "./colorsBase";

export const getNavbarStyles = (width: number) => {
  const isWeb = width > 768;

  return StyleSheet.create({

    // ─── Topbar (redes sociais + contato) ─────────────────────────────────
    Redes: {
      backgroundColor: Colors.primary,
      width: "100%",
      paddingVertical: 6,
      paddingHorizontal: isWeb ? 32 : 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    grupoRedes: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
    },
    grupoContato: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    Text_Redes: {
      color: "rgba(255,255,255,0.9)",
      fontSize: 12,
    },
    Redes_Icon: {
      width: 16,
      height: 16,
    },

    // ─── Navbar principal ──────────────────────────────────────────────────
    navBarDiv: {
      width: "100%",
      backgroundColor: Colors.navBar,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 16,
      paddingVertical: 14,
      paddingHorizontal: isWeb ? 32 : 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors.light_grayBorder,
      ...Platform.select({
        web: { boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
      }),
    },
    DivNavBarLogo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: -19,
    },
    DivNavBarPag: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      marginBottom: -5,
      marginTop: 16,
      paddingTop: 10,
      borderTopWidth: 1.5,
      borderTopColor: Colors.light_grayBorder,
      width: isWeb ? "50%" : "90%",
    },
    navBarPag: {
      fontSize: 14,
      color: Colors.text,
      ...Platform.select({ web: { cursor: "pointer" } }),
    },
    navBarPagAtivo: {
      fontSize: 14,
      color: Colors.primary,
      fontWeight: "600",
      ...Platform.select({ web: { cursor: "pointer" } }),
    },
    image: {
      width: isWeb ? 44 : 42,
      height: isWeb ? 44 : 42,
      borderRadius: 8,
    },
    TitleNav: {
      fontSize: isWeb ? 17 : 15,
      color: Colors.text,
      fontWeight: "600",
      letterSpacing: 0.5,
    },
  });
};
