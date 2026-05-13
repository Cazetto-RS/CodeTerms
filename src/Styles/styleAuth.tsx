import { StyleSheet } from "react-native";

export const Colors = {
  primary:   "#1A80B6",
  dark:      "#1A1D24",
  white:     "#FFFFFF",
  background:"#F5F7FA",
  border:    "#D8DCE6",
  text:      "#131417",
  bodyText:  "#4B5563",
  mutedText: "#6B7280",
  error:     "#C0514A",
  errorBg:   "#FEF3F3",
};

export const getStyles = (width: number) => {
  const isWeb = width > 768;

  return StyleSheet.create({
    scroll: {
      flex: 1,
      
      backgroundColor: Colors.background,
    },
    center: {
      flex: 1,
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      paddingVertical: 48,
    },
    card: {
      width: "100%",
      maxWidth: isWeb ? 440 : undefined,
      backgroundColor: Colors.white,
      borderRadius: 16,
      padding: isWeb ? 40 : 28,
      borderWidth: 1,
      borderColor: Colors.border,
      marginTop: isWeb ? 0 : 150
    },
    cardCadastro: {
      width: "100%",
      maxWidth: isWeb ? 440 : undefined,
      backgroundColor: Colors.white,
      borderRadius: 16,
      padding: isWeb ? 40 : 28,
      borderWidth: 1,
      borderColor: Colors.border,
      marginTop: isWeb ? 100 : 150
    },
    espacamento: {
      width: 20,
      height: 40
    },

    // ── Topo do card
    cardIcon: {
      width: 52,
      height: 52,
      borderRadius: 14,
      backgroundColor: "#EBF5FB",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
    },
    cardTitle: {
      fontSize: 24,
      fontWeight: "800",
      color: Colors.dark,
      marginBottom: 6,
      letterSpacing: -0.5,
    },
    cardSubtitle: {
      fontSize: 14,
      color: Colors.mutedText,
      lineHeight: 22,
      marginBottom: 28,
    },

    // ── Campos
    fieldGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 13,
      fontWeight: "600",
      color: Colors.text,
      marginBottom: 6,
    },
    input: {
      borderWidth: 1,
      borderColor: Colors.border,
      borderRadius: 8,
      paddingHorizontal: 14,
      paddingVertical: 11,
      fontSize: 14,
      color: Colors.text,
      backgroundColor: Colors.white,
    },
    inputHint: {
      fontSize: 12,
      color: Colors.mutedText,
      marginTop: 5,
    },

    // ── Botão principal
    btn: {
      backgroundColor: Colors.primary,
      borderRadius: 8,
      paddingVertical: 13,
      alignItems: "center",
      marginTop: 8,
    },
    btnText: {
      color: Colors.white,
      fontSize: 15,
      fontWeight: "700",
    },

    // ── Link de rodapé
    footerRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
      marginTop: 20,
    },
    footerText: {
      fontSize: 13,
      color: Colors.mutedText,
    },
    footerLink: {
      fontSize: 13,
      color: Colors.primary,
      fontWeight: "600",
    },

    // ── Divider
    divider: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginVertical: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: Colors.border,
    },
    dividerText: {
      fontSize: 12,
      color: Colors.mutedText,
    },
  });
};
