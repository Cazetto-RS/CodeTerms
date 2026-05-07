import { StyleSheet } from "react-native";

export const Colors = {
  primary:    "#1A80B6",
  dark:       "#1A1D24",
  background: "#F5F7FA",
  surface:    "#F7F9FC",
  surfaceBlue:"#EBF5FB",
  white:      "#FFFFFF",
  border:     "#E8ECF2",
  text:       "#131417",
  bodyText:   "#4B5563",
  mutedText:  "#6B7280",
  lightText:  "#9CA3AF",
};

export const getStyles = (width: number) => {
  const isWeb = width > 768;
  const hPad = isWeb ? Math.min((width - 900) / 2, 120) : 20;

  return StyleSheet.create({

    scroll: {
      flex: 1,
      backgroundColor: Colors.background,
    },

    // ── Hero
    hero: {
      paddingHorizontal: hPad,
      paddingTop: isWeb ? 64 : 40,
      paddingBottom: isWeb ? 52 : 36,
      backgroundColor: Colors.white,
    },
    heroBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: Colors.surfaceBlue,
      alignSelf: "flex-start",
      paddingHorizontal: 14,
      paddingVertical: 7,
      borderRadius: 20,
      marginBottom: 10,
    },
    heroBadgeText: {
      fontSize: 13,
      color: Colors.primary,
      fontWeight: "600",
    },
    heroTitle: {
      fontSize: isWeb ? 72 : 34,
      fontWeight: "800",
      color: Colors.dark,
      lineHeight: isWeb ? 70 : 44,
      marginBottom: 20,
      letterSpacing: -1,
    },
    heroTitleBlue: {
      color: Colors.primary,
      fontSize: isWeb ? 92 : 34,
    },
    heroSubtitle: {
      fontSize: isWeb ? 18 : 15,
      color: Colors.mutedText,
      lineHeight: isWeb ? 30 : 24,
      maxWidth: 640,
    },

    // ── Imagem
    imageWrapper: {
      marginHorizontal: hPad,
      marginTop: 32,
      position: "relative",
    },
    imageCaption: {
      position: "absolute",
      bottom: 12,
      left: 12,
      backgroundColor: "rgba(0,0,0,0.5)",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 6,
    },
    imageCaptionText: {
      color: Colors.white,
      fontSize: 12,
    },

    // ── Seção branca
    section: {
      paddingHorizontal: hPad,
      paddingTop: isWeb ? 64 : 44,
      paddingBottom: isWeb ? 56 : 40,
      backgroundColor: Colors.white,
      marginTop: 12,
    },

    // ── Seção azul
    sectionBlue: {
      paddingHorizontal: hPad,
      paddingTop: isWeb ? 64 : 44,
      paddingBottom: isWeb ? 64 : 44,
      backgroundColor: Colors.primary,
      marginTop: 12,
    },

    // ── Cabeçalho de seção
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 14,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: Colors.primary,
    },
    dotWhite: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "rgba(255,255,255,0.7)",
    },
    tag: {
      fontSize: 13,
      fontWeight: "600",
      color: Colors.primary,
      textTransform: "uppercase",
      letterSpacing: 0.8,
    },
    tagWhite: {
      fontSize: 13,
      fontWeight: "600",
      color: "rgba(255,255,255,0.8)",
      textTransform: "uppercase",
      letterSpacing: 0.8,
    },
    sectionTitle: {
      fontSize: isWeb ? 32 : 24,
      fontWeight: "800",
      color: Colors.dark,
      letterSpacing: -0.5,
      marginBottom: 20,
    },
    sectionTitleWhite: {
      fontSize: isWeb ? 32 : 24,
      fontWeight: "800",
      color: Colors.white,
      letterSpacing: -0.5,
      marginBottom: 20,
    },

    // ── Textos
    body: {
      fontSize: 15,
      color: Colors.bodyText,
      lineHeight: 26,
      marginBottom: 14,
      flex: isWeb ? 1 : undefined,
    },
    bodyWhite: {
      fontSize: 15,
      color: "rgba(255,255,255,0.85)",
      lineHeight: 26,
      marginBottom: 16,
    },
    bold: {
      fontWeight: "700",
      color: Colors.dark,
    },
    boldWhite: {
      fontWeight: "700",
      color: Colors.white,
    },

    // ── Layout duas colunas
    row: {
      flexDirection: isWeb ? "row" : "column",
      gap: isWeb ? 32 : 0,
    },

    // ── Stats
    statsRow: {
      flexDirection: "row",
      paddingHorizontal: hPad,
      paddingVertical: 28,
      backgroundColor: Colors.surfaceBlue,
      gap: 12,
    },
    statCard: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 20,
      backgroundColor: Colors.white,
      borderRadius: 12,
    },
    statNumber: {
      fontSize: isWeb ? 24 : 17,
      fontWeight: "800",
      color: Colors.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 11,
      color: Colors.lightText,
      textAlign: "center",
    },

    // ── Cards de pilar
    pillarsRow: {
      flexDirection: isWeb ? "row" : "column",
      gap: 16,
    },
    pillarCard: {
      flex: isWeb ? 1 : undefined,
      backgroundColor: Colors.surface,
      borderRadius: 14,
      padding: 24,
      borderWidth: 1,
      borderColor: Colors.border,
      marginBottom: isWeb ? 0 : 12,
    },
    pillarIcon: {
      width: 44,
      height: 44,
      borderRadius: 10,
      backgroundColor: Colors.surfaceBlue,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    pillarTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: Colors.dark,
      marginBottom: 10,
    },
    pillarDescription: {
      fontSize: 14,
      color: Colors.mutedText,
      lineHeight: 22,
    },

    // ── FATEC
    fatecRow: {
      flexDirection: isWeb ? "row" : "column",
      alignItems: isWeb ? "center" : "stretch",
      gap: isWeb ? 48 : 0,
    },
    fatecCol: {
      flex: isWeb ? 1 : undefined,
    },
    fatecImageCol: {
      flex: isWeb ? 1 : undefined,
      marginTop: isWeb ? 0 : 32,
    },
    fatecBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      alignSelf: "flex-start",
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
      borderWidth: 1.5,
      borderColor: Colors.primary,
      marginTop: 8,
    },
    fatecBtnText: {
      fontSize: 14,
      fontWeight: "600",
      color: Colors.primary,
    },

    // ── CTA final
    cta: {
      paddingHorizontal: hPad,
      paddingTop: isWeb ? 56 : 40,
      paddingBottom: isWeb ? 56 : 40,
      marginTop: 12,
      backgroundColor: Colors.dark,
    },
    ctaTitle: {
      fontSize: isWeb ? 30 : 22,
      fontWeight: "800",
      color: Colors.white,
      marginBottom: 12,
      letterSpacing: -0.5,
    },
    ctaSubtitle: {
      fontSize: 15,
      color: "rgba(255,255,255,0.6)",
      lineHeight: 24,
      maxWidth: 480,
      marginBottom: 28,
    },
    ctaBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: Colors.primary,
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: 8,
      alignSelf: "flex-start",
    },
    ctaBtnText: {
      fontSize: 15,
      fontWeight: "700",
      color: Colors.white,
    },
  });
};
