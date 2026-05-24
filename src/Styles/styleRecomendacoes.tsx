import { StyleSheet } from "react-native";

export const Colors = {
  primary:     "#1A80B6",
  dark:        "#1A1D24",
  white:       "#FFFFFF",
  background:  "#F5F7FA",
  border:      "#E8ECF2",
  borderLight: "#F0F2F6",
  text:        "#131417",
  bodyText:    "#4B5563",
  mutedText:   "#6B7280",
  lightText:   "#9CA3AF",

  // Status
  pendenteBg:    "#FEF9EB",
  pendenteColor: "#B45309",
  pendenteBorder:"#FDE68A",
  aprovadoBg:    "#EDFAF3",
  aprovadoColor: "#2E7D57",
  aprovadoBorder:"#A7F3D0",
  rejeitadoBg:   "#FEF3F3",
  rejeitadoColor:"#C0514A",
  rejeitadoBorder:"#FECACA",
};

export const getStyles = (width: number) => {
  const isWeb = width > 768;
  const hPad = isWeb ? Math.min((width - 900) / 2, 80) : 16;

  return StyleSheet.create({

    // ── Página
    scroll: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    content: {
      paddingHorizontal: hPad,
      paddingTop: isWeb ? 48 : 28,
      paddingBottom: 48,
    },

    // ── Cabeçalho
    header: {
      marginBottom: 24,
    },
    headerTitle: {
      fontSize: isWeb ? 28 : 22,
      fontWeight: "800",
      color: Colors.dark,
      letterSpacing: -0.5,
    },
    headerSubtitle: {
      fontSize: 14,
      color: Colors.mutedText,
      marginTop: 4,
    },

    // ── Filtros
    filtrosScroll: {
      marginBottom: 20,
    },
    filtrosContent: {
      flexDirection: "row",
      paddingRight: 16,
    },
    filtroBtnAtivo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: Colors.primary,
      borderWidth: 1,
      borderColor: Colors.primary,
    },
    filtroBtnInativo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: Colors.white,
      borderWidth: 1,
      borderColor: "#D8DCE6",
    },
    filtroTextoAtivo: {
      fontSize: 13,
      fontWeight: "600",
      color: Colors.white,
    },
    filtroTextoInativo: {
      fontSize: 13,
      fontWeight: "600",
      color: Colors.mutedText,
    },
    filtroBadgeAtivo: {
      backgroundColor: "rgba(255,255,255,0.25)",
      paddingHorizontal: 7,
      paddingVertical: 1,
      borderRadius: 10,
    },
    filtroBadgeInativo: {
      backgroundColor: "#F0F2F6",
      paddingHorizontal: 7,
      paddingVertical: 1,
      borderRadius: 10,
    },
    filtroBadgeTextoAtivo: {
      fontSize: 11,
      fontWeight: "700",
      color: Colors.white,
    },
    filtroBadgeTextoInativo: {
      fontSize: 11,
      fontWeight: "700",
      color: Colors.lightText,
    },

    // ── Erro
    erroBox: {
      backgroundColor: Colors.rejeitadoBg,
      borderRadius: 10,
      padding: 14,
      marginBottom: 16,
    },
    erroTexto: {
      fontSize: 13,
      color: Colors.rejeitadoColor,
    },

    // ── Loading / vazio
    loadingBox: {
      alignItems: "center",
      paddingTop: 60,
    },
    loadingTexto: {
      fontSize: 13,
      color: Colors.lightText,
      marginTop: 12,
    },
    vazioTexto: {
      fontSize: 15,
      color: Colors.lightText,
    },

    // ── Card
    card: {
      backgroundColor: Colors.white,
      borderRadius: 14,
      padding: isWeb ? 24 : 16,
      borderWidth: 1,
      borderColor: Colors.border,
      marginBottom: 12,
    },
    cardTopo: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 12,
    },
    cardTopoLeft: {
      flex: 1,
      marginRight: 12,
    },
    cardTermoEn: {
      fontSize: isWeb ? 16 : 15,
      fontWeight: "800",
      color: Colors.dark,
    },
    cardTermoPt: {
      fontSize: 13,
      color: Colors.primary,
      fontWeight: "600",
      marginTop: 2,
    },
    cardConteudo: {
      marginBottom: 12,
      gap: 8,
    },
    cardSecaoLabel: {
      fontSize: 11,
      fontWeight: "600",
      color: Colors.lightText,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 2,
    },
    cardSecaoTexto: {
      fontSize: 13,
      color: Colors.bodyText,
      lineHeight: 20,
    },
    cardRodape: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: Colors.borderLight,
    },
    cardRodapeUsuario: {
      fontSize: 12,
      color: Colors.lightText,
    },
    cardRodapeUsuarioNome: {
      fontWeight: "600",
      color: Colors.mutedText,
    },
    cardRodapeData: {
      fontSize: 12,
      color: Colors.lightText,
    },

    // ── Ações do card
    acoesRow: {
      flexDirection: "row",
      gap: 8,
      flexWrap: "wrap",
    },
    btnAprovar: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 7,
      backgroundColor: Colors.aprovadoBg,
      borderWidth: 1,
      borderColor: Colors.aprovadoBorder,
    },
    btnAprovarTexto: {
      fontSize: 12,
      fontWeight: "600",
      color: Colors.aprovadoColor,
    },
    btnRejeitar: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 7,
      backgroundColor: Colors.rejeitadoBg,
      borderWidth: 1,
      borderColor: Colors.rejeitadoBorder,
    },
    btnRejeitarTexto: {
      fontSize: 12,
      fontWeight: "600",
      color: Colors.rejeitadoColor,
    },
    btnPendente: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 7,
      backgroundColor: Colors.pendenteBg,
      borderWidth: 1,
      borderColor: Colors.pendenteBorder,
    },
    btnPendenteTexto: {
      fontSize: 12,
      fontWeight: "600",
      color: Colors.pendenteColor,
    },
    btnDeletar: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 7,
      backgroundColor: Colors.rejeitadoBg,
      borderWidth: 1,
      borderColor: Colors.rejeitadoBorder,
    },
    btnDeletarTexto: {
      fontSize: 12,
      fontWeight: "600",
      color: Colors.rejeitadoColor,
    },
    btnCriar: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 7,
      backgroundColor: Colors.primary,
    },
    btnCriarTexto: {
      fontSize: 12,
      fontWeight: "600",
      color: Colors.white,
    },

    // ── Badge de status
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 20,
    },
    statusTexto: {
      fontSize: 11,
      fontWeight: "700",
    },
  });
};