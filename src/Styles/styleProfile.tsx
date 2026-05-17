import { StyleSheet } from "react-native";

export const Colors = {
  primary:   "#1A80B6",
  dark:      "#1A1D24",
  white:     "#FFFFFF",
  background:"#F5F7FA",
  surface:   "#F7F9FC",
  surfaceBlue:"#EBF5FB",
  border:    "#D8DCE6",
  text:      "#131417",
  bodyText:  "#4B5563",
  mutedText: "#6B7280",
  lightText: "#9CA3AF",
};

export const getStyles = (width: number) => {
  const isWeb = width > 768;
  const hPad = isWeb ? Math.min((width - 700) / 2, 120) : 20;

  return StyleSheet.create({
    scroll: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    content: {
      paddingHorizontal: hPad,
      paddingTop: isWeb ? 52 : 36,
      paddingBottom: 48,
    },

    cardGrupo: {
      flex: 1,
      flexDirection: isWeb ? "row" : "column",
      gap: "1.5%",
      marginBottom: 16,
      width: "100%",
    },
    topRow: {

    },
    alinhamento: {
      flex: 1,
      flexDirection: isWeb? "row" : "column",
      gap: "2%",
      width: "100%",
      marginBottom: 10
    },

    // ── Cabeçalho do perfil
    header: {
      backgroundColor: Colors.white,
      borderRadius: 16,
      padding: isWeb ? 36 : 24,
      borderWidth: 1,
      borderColor: Colors.border,
      alignItems: "center",
      marginBottom: 16,
      width: isWeb ? "20%" : "100%",
      height: isWeb ? "95%" : "50%"
    },
    avatar: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: Colors.surfaceBlue,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 14,
    },
    avatarInitials: {
      fontSize: 26,
      fontWeight: "800",
      color: Colors.primary,
    },
    userName: {
      fontSize: isWeb ? 22 : 20,
      fontWeight: "800",
      color: Colors.dark,
      marginBottom: 4,
    },
    userEmail: {
      fontSize: 14,
      color: Colors.mutedText,
    },

    // ── Card de informações
    cardDados: {
      flex: 1,
      backgroundColor: Colors.white,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: Colors.border,
      overflow: "hidden",
      width: isWeb ? "78%" : "100%",
      height: isWeb ? "95%" : "100%",
      justifyContent: "center"

    },
    card: {
      backgroundColor: Colors.white,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: Colors.border,
      marginBottom: 16,
      overflow: "hidden",
      width: "100%"
    },
    cardConta: {
      backgroundColor: Colors.white,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: Colors.border,
      marginBottom: 16,
      overflow: "hidden",
    },
    cardHeader: {
      paddingHorizontal: isWeb ? 28 : 20,
      paddingTop: isWeb ? 24 : 18,
      paddingBottom: 14,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: "700",
      color: Colors.dark,
      textTransform: "uppercase",
      letterSpacing: 0.6,
    },

    // ── Linha de info
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: isWeb ? 28 : 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
    },
    infoRowLast: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: isWeb ? 28 : 20,
      paddingVertical: 16,
    },
    infoLabel: {
      fontSize: 13,
      color: Colors.mutedText,
      fontWeight: "500",
    },
    infoValue: {
      fontSize: 14,
      color: Colors.text,
      fontWeight: "600",
    },

    // ── Botões de ação
    actionBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: isWeb ? 28 : 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: Colors.border,
    },
    actionBtnLast: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: isWeb ? 28 : 20,
      paddingVertical: 16,
    },
    actionBtnLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    actionBtnIcon: {
      width: 36,
      height: 36,
      borderRadius: 10,
      backgroundColor: Colors.surfaceBlue,
      alignItems: "center",
      justifyContent: "center",
    },
    actionBtnText: {
      fontSize: 14,
      fontWeight: "600",
      color: Colors.text,
    },

    // ── Botão sair
    logoutBtn: {
      backgroundColor: Colors.white,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#F5C6C6",
      paddingVertical: 16,
      alignItems: "center",
      marginTop: 4,
    },
    logoutText: {
      fontSize: 14,
      fontWeight: "700",
      color: "#C0514A",
    },
  });
};
