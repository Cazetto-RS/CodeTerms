import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, useWindowDimensions, ActivityIndicator,
} from "react-native";
import { getStyles } from "../Styles/styleAuth";
import { AuthService } from "../server/authService";

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1A80B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = ({ visible }: { visible: boolean }) => visible ? (
  <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
) : (
  <svg viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default function AlterarSenha({
  onNavegar,
  usuario,
}: {
  onNavegar: (pagina: any) => void;
  usuario: any;
}) {
  const { width } = useWindowDimensions();
  const s = getStyles(width);

  const [senhaAtual,       setSenhaAtual]       = useState("");
  const [novaSenha,        setNovaSenha]        = useState("");
  const [confirmarSenha,   setConfirmarSenha]   = useState("");
  const [verAtual,         setVerAtual]         = useState(false);
  const [verNova,          setVerNova]          = useState(false);
  const [verConfirmar,     setVerConfirmar]     = useState(false);
  const [loading,          setLoading]          = useState(false);
  const [erro,             setErro]             = useState("");
  const [sucesso,          setSucesso]          = useState(false);

  const handleSalvar = async () => {
    setErro("");

    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setErro("Preencha todos os campos."); return;
    }
    if (novaSenha.length < 6) {
      setErro("A nova senha deve ter pelo menos 6 caracteres."); return;
    }
    if (novaSenha !== confirmarSenha) {
      setErro("A nova senha e a confirmação não coincidem."); return;
    }
    if (novaSenha === senhaAtual) {
      setErro("A nova senha deve ser diferente da senha atual."); return;
    }

    setLoading(true);
    try {
      await AuthService.updateSenha(usuario.id, {
        senha_atual: senhaAtual,
        nova_senha:  novaSenha,
      });
      setSucesso(true);
    } catch (e: any) {
      const msg = e?.response?.data?.error ?? e?.message ?? "Erro ao alterar senha.";
      setErro(String(msg));
    } finally {
      setLoading(false);
    }
  };

  if (sucesso) {
    return (
      <ScrollView style={s.scroll} contentContainerStyle={s.center}>
        <View style={s.card}>
          <View style={[s.cardIcon, { backgroundColor: "#EDFAF3" }]}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#2E7D57" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </View>
          <Text style={s.cardTitle}>Senha alterada!</Text>
          <Text style={s.cardSubtitle}>
            Sua senha foi atualizada com sucesso.
          </Text>
          <TouchableOpacity style={s.btn} onPress={() => onNavegar("Perfil")}>
            <Text style={s.btnText}>Voltar ao perfil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.center}>
      <View style={s.card}>

        <Text style={s.cardTitle}>Alterar senha</Text>
        <Text style={s.cardSubtitle}>
          Informe sua senha atual e escolha uma nova senha.
        </Text>

        {!!erro && (
          <View style={{ backgroundColor: "#FEF3F3", borderRadius: 8, padding: 12, marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: "#C0514A" }}>{erro}</Text>
          </View>
        )}

        {/* Senha atual */}
        <View style={s.fieldGroup}>
          <Text style={s.label}>Senha atual</Text>
          <View style={{ position: "relative" }}>
            <TextInput
              style={[s.input, { paddingRight: 44 }]}
              placeholder="••••••••" placeholderTextColor="#9CA3AF"
              secureTextEntry={!verAtual}
              value={senhaAtual} onChangeText={setSenhaAtual}
            />
            <TouchableOpacity onPress={() => setVerAtual(!verAtual)} style={{ position: "absolute", right: 12, top: 12 }}>
              <EyeIcon visible={verAtual} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Nova senha */}
        <View style={s.fieldGroup}>
          <Text style={s.label}>Nova senha</Text>
          <View style={{ position: "relative" }}>
            <TextInput
              style={[s.input, { paddingRight: 44 }]}
              placeholder="Mínimo 6 caracteres" placeholderTextColor="#9CA3AF"
              secureTextEntry={!verNova}
              value={novaSenha} onChangeText={setNovaSenha}
            />
            <TouchableOpacity onPress={() => setVerNova(!verNova)} style={{ position: "absolute", right: 12, top: 12 }}>
              <EyeIcon visible={verNova} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirmar nova senha */}
        <View style={s.fieldGroup}>
          <Text style={s.label}>Confirmar nova senha</Text>
          <View style={{ position: "relative" }}>
            <TextInput
              style={[
                s.input, { paddingRight: 44 },
                confirmarSenha && novaSenha !== confirmarSenha ? { borderColor: "#C0514A" } : {},
              ]}
              placeholder="Repita a nova senha" placeholderTextColor="#9CA3AF"
              secureTextEntry={!verConfirmar}
              value={confirmarSenha} onChangeText={setConfirmarSenha}
            />
            <TouchableOpacity onPress={() => setVerConfirmar(!verConfirmar)} style={{ position: "absolute", right: 12, top: 12 }}>
              <EyeIcon visible={verConfirmar} />
            </TouchableOpacity>
          </View>
          {!!confirmarSenha && novaSenha !== confirmarSenha && (
            <Text style={[s.inputHint, { color: "#C0514A" }]}>As senhas não coincidem.</Text>
          )}
        </View>

        <TouchableOpacity style={s.btn} onPress={handleSalvar} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Salvar nova senha</Text>}
        </TouchableOpacity>

        <View style={s.footerRow}>
          <TouchableOpacity onPress={() => onNavegar("Perfil")}>
            <Text style={s.footerLink}>Cancelar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}
