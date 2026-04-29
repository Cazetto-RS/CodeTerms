import { StyleSheet } from "react-native";

const primary = "#1A80B6";
const textPrimary = "#131417";
const textSecondary = "#5A5F6E";
const borderColor = "#E5E8EF";
const bgPage = "#F5F7FA";
const bgCard = "#FFFFFF";
const bgSecondary = "#F0F4F8";

export const getStyles = (width: number) => {
  const isWeb = width > 768;

  return StyleSheet.create({
    // ─── Overlay ─────────────────────────────────────────────────────────────
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.55)",
      justifyContent: "center",
      alignItems: "center",
    },

    // ─── Container do modal ──────────────────────────────────────────────────
    containerDiv: {
      width: isWeb ? "42%" : "100%",
      height: isWeb ? "85%" : "100%",
      backgroundColor: bgCard,
      borderRadius: isWeb ? 16 : 0,
      overflow: "hidden",
      flexDirection: "column",
    },

    // ─── Cabeçalho ───────────────────────────────────────────────────────────
    header: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      paddingHorizontal: 28,
      paddingTop: 26,
      paddingBottom: 16,
      backgroundColor: bgCard,
    },
    headerLeft: {
      flex: 1,
      marginRight: 16,
    },
    headerActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    title: {
      fontSize: 26,
      color: textPrimary,
      fontWeight: "600",
      lineHeight: 32,
    },
    silabas: {
      fontSize: 13,
      color: primary,
      marginTop: 4,
      fontWeight: "400",
      letterSpacing: 1,
    },

    // Botões de ação no header
    iconBtn: {
      width: 34,
      height: 34,
      borderRadius: 8,
      backgroundColor: "#EBF4FB",
      alignItems: "center",
      justifyContent: "center",
    },
    closeBtn: {
      width: 34,
      height: 34,
      borderRadius: 8,
      backgroundColor: bgSecondary,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 4,
    },

    // ─── Divisória ───────────────────────────────────────────────────────────
    divider: {
      height: 1,
      backgroundColor: borderColor,
      marginHorizontal: 0,
    },

    // ─── Scroll ──────────────────────────────────────────────────────────────
    container: {
      flex: 1,
      backgroundColor: bgPage,
    },
    scrollContent: {
      padding: 20,
      gap: 0,
    },

    // ─── Card de tradução em destaque ─────────────────────────────────────────
    traducaoCard: {
      backgroundColor: primary,
      borderRadius: 12,
      paddingHorizontal: 20,
      paddingVertical: 16,
      marginBottom: 16,
    },
    traducaoLabel: {
      fontSize: 11,
      fontWeight: "600",
      color: "rgba(255,255,255,0.7)",
      textTransform: "uppercase",
      letterSpacing: 0.8,
      marginBottom: 4,
    },
    traducaoTexto: {
      fontSize: 20,
      color: "#FFFFFF",
      fontWeight: "600",
    },

    // ─── Seções ───────────────────────────────────────────────────────────────
    secao: {
      backgroundColor: bgCard,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: borderColor,
      paddingHorizontal: 18,
      paddingVertical: 16,
      marginBottom: 12,
    },
    secaoLabel: {
      fontSize: 13,
      fontWeight: "600",
      color: primary,
      textTransform: "uppercase",
      letterSpacing: 0.8,
      marginBottom: 8,
    },
    textoSecao: {
      fontSize: 15,
      color: textSecondary,
      lineHeight: 23,
    },

    // ─── Exemplos ────────────────────────────────────────────────────────────
    exemploItem: {
      marginBottom: 12,
      gap: 6,
    },
    exemploBadgeRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
    },
    langBadge: {
      borderRadius: 4,
      paddingHorizontal: 6,
      paddingVertical: 2,
      marginTop: 1,
      flexShrink: 0,
    },
    langBadgePt: {
      backgroundColor: "#E8F3FB",
    },
    langBadgeEn: {
      backgroundColor: "#EAF6F1",
    },
    langBadgeText: {
      fontSize: 13,
      fontWeight: "500",
      color: "#3A3E47",
      letterSpacing: 0.5,
    },
    exemploTexto: {
      fontSize: 15,
      color: textSecondary,
      lineHeight: 21,
      flex: 1,
    },

    // ─── Tags (sinônimos / antônimos) ─────────────────────────────────────────
    tagRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
    },
    tag: {
      backgroundColor: "#EBF4FB",
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 5,
    },
    tagText: {
      fontSize: 15,
      color: textSecondary,
      lineHeight: 23,
    },
    tagAntonimo: {
      backgroundColor: "#FEF1EE",
    },
    tagTextAntonimo: {
      color: textSecondary,
    },

    // ─── Imagem ───────────────────────────────────────────────────────────────
    imagemContainer: {
      borderRadius: 10,
      overflow: "hidden",
      backgroundColor: bgSecondary,
    },
    image: {
      width: "100%",
      aspectRatio: 16 / 9,
      maxHeight: isWeb ? 280 : 200,
    },

    // Utilitário (mantido para compatibilidade)
    border: {
      borderWidth: 1,
      borderColor: borderColor,
    },
    DivImage: {
      backgroundColor: bgSecondary,
      borderRadius: 8,
    },
    subtitle: {
      fontSize: 15,
      color: textSecondary,
    },
    title2: {
      fontSize: 16,
      color: textPrimary,
      fontWeight: "600",
    },
    svg: {
      marginLeft: 10,
    },
    svg2: {
      marginLeft: 8,
    },
  });
};
