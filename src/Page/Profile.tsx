import React from "react";
import { View, Text, ScrollView, TouchableOpacity, useWindowDimensions } from "react-native";
import { getStyles } from "../Styles/styleProfile";

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

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#C0514A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

// Dados mock — substituir por contexto/estado real quando tiver autenticação
const USUARIO = {
  nome: "Maria da Silva",
  email: "maria@email.com",
  anoNascimento: "2005",
};

function getInitials(nome: string) {
  const partes = nome.trim().split(" ");
  if (partes.length === 1) return partes[0][0].toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

export default function Profile({ onNavegar }: { onNavegar: (pagina: any) => void }) {
  const { width } = useWindowDimensions();
  const s = getStyles(width);

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>

      {/* ── Cabeçalho ── */}
      <View style={s.cardGrupo}>
        <View style={s.header}>
          <View style={s.avatar}>
            <Text style={s.avatarInitials}>{getInitials(USUARIO.nome)}</Text>
          </View>
          <Text style={s.userName}>{USUARIO.nome}</Text>
          <Text style={s.userEmail}>{USUARIO.email}</Text>
        </View>

        {/* ── Dados pessoais ── */}
        <View style={s.card}>
          <View style={s.cardHeader}>
            <Text style={s.cardTitle}>Dados pessoais</Text>
          </View>

          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Nome completo</Text>
            <Text style={s.infoValue}>{USUARIO.nome}</Text>
          </View>

          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Ano de nascimento</Text>
            <Text style={s.infoValue}>{USUARIO.anoNascimento}</Text>
          </View>

          <View style={s.infoRowLast}>
            <Text style={s.infoLabel}>E-mail</Text>
            <Text style={s.infoValue}>{USUARIO.email}</Text>
          </View>
        </View>
      </View>

      {/* ── Conta ── */}
      <View style={s.cardConta}>
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

      {/* ── Sair ── */}
      <TouchableOpacity style={s.logoutBtn} onPress={() => onNavegar("Login")}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <LogoutIcon />
          <Text style={s.logoutText}>Sair da conta</Text>
        </View>
      </TouchableOpacity>

    </ScrollView>
  );
}
