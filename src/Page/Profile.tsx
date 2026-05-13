import React from "react";
import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import { getStyles } from "../Styles/styleProfile";
import { AuthService } from "../server/authService";

const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1A80B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1A80B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1A80B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#C0514A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

function getInitials(nome: string) {
  const partes = nome.trim().split(" ");
  if (partes.length === 1) return partes[0][0].toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

export default function Profile({
  onNavegar,
  usuario,
}: {
  onNavegar: (pagina: any) => void;
  usuario: any;
}) {
  const { width } = useWindowDimensions();
  const s = getStyles(width);

  const isAdmin = usuario?.nivel_acesso === "admin";

  const handleLogout = () => {
    AuthService.logout();
    onNavegar("Login");
  };

  // Fallback se vier sem usuário
  if (!usuario) {
    return (
      <ScrollView style={s.scroll} contentContainerStyle={s.content}>
        <View style={s.header}>
          <Text style={s.userName}>Sessão encerrada</Text>
          <TouchableOpacity style={{ marginTop: 16 }} onPress={() => onNavegar("Login")}>
            <Text style={{ color: "#1A80B6", fontWeight: "600" }}>Fazer login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>

      {/* ── Topo: avatar + dados pessoais ── */}
      <View style={s.topRow}>

        {/* Avatar */}
        <View style={s.header}>
          <View style={s.avatar}>
            <Text style={s.avatarInitials}>{getInitials(usuario.nome)}</Text>
          </View>
          <Text style={s.userName}>{usuario.nome}</Text>
          <Text style={s.userEmail}>{usuario.email}</Text>
          {isAdmin && (
            <View style={{ marginTop: 10, backgroundColor: "#EBF5FB", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 }}>
              <Text style={{ fontSize: 11, fontWeight: "700", color: "#1A80B6" }}>ADMIN</Text>
            </View>
          )}
        </View>

        {/* Dados pessoais */}
        <View style={[s.card, { marginBottom: 0 }]}>
          <View style={s.cardHeader}>
            <Text style={s.cardTitle}>Dados pessoais</Text>
          </View>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Nome completo</Text>
            <Text style={s.infoValue}>{usuario.nome}</Text>
          </View>
          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Ano de nascimento</Text>
            <Text style={s.infoValue}>{usuario.ano_nascimento}</Text>
          </View>
          <View style={s.infoRowLast}>
            <Text style={s.infoLabel}>E-mail</Text>
            <Text style={s.infoValue}>{usuario.email}</Text>
          </View>
        </View>
      </View>

      {/* ── Conta ── */}
      <View style={s.card}>
        <View style={s.cardHeader}>
          <Text style={s.cardTitle}>Conta</Text>
        </View>
        <TouchableOpacity style={s.actionBtn}>
          <View style={s.actionBtnLeft}>
            <View style={s.actionBtnIcon}><EditIcon /></View>
            <Text style={s.actionBtnText}>Editar informações</Text>
          </View>
          <ChevronIcon />
        </TouchableOpacity>
        <TouchableOpacity style={s.actionBtnLast}>
          <View style={s.actionBtnLeft}>
            <View style={s.actionBtnIcon}><LockIcon /></View>
            <Text style={s.actionBtnText}>Alterar senha</Text>
          </View>
          <ChevronIcon />
        </TouchableOpacity>
      </View>

      {/* ── Painel admin (só aparece se for admin) ── */}
      {isAdmin && (
        <View style={s.card}>
          <View style={s.cardHeader}>
            <Text style={s.cardTitle}>Administração</Text>
          </View>
          <TouchableOpacity style={s.actionBtnLast} onPress={() => onNavegar("NovoTermo")}>
            <View style={s.actionBtnLeft}>
              <View style={s.actionBtnIcon}><PlusIcon /></View>
              <Text style={s.actionBtnText}>Adicionar novo termo</Text>
            </View>
            <ChevronIcon />
          </TouchableOpacity>
        </View>
      )}

      {/* ── Sair ── */}
      <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <LogoutIcon />
          <Text style={s.logoutText}>Sair da conta</Text>
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
}
