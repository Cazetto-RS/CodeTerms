import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, useWindowDimensions, ActivityIndicator,
} from "react-native";
import { getStyles } from "../Styles/styleAuth";
import { AuthService, loadSession } from "../server/authService";

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

export default function Login({ onNavegar }: { onNavegar: (pagina: any, user?: any) => void }) {
  const { width } = useWindowDimensions();
  const s = getStyles(width);

  const [email, setEmail]               = useState("");
  const [senha, setSenha]               = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [erro, setErro]                 = useState("");

  const handleLogin = async () => {
    setErro("");
    if (!email || !senha) { setErro("Preencha e-mail e senha."); return; }

    setLoading(true);
    try {
      const { user } = await AuthService.login({ email, senha });
      // Navega para Perfil passando o usuário logado
      onNavegar("Perfil", user);
    } catch (e: any) {
      const msg = e?.response?.data?.error ?? "Erro ao fazer login. Tente novamente.";
      setErro(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.center}>
      <View style={s.card}>

        <Text style={s.cardTitle}>Entrar</Text>
        <Text style={s.cardSubtitle}>
          Acesse sua conta para continuar explorando o dicionário.
        </Text>

        {/* Erro */}
        {!!erro && (
          <View style={{ backgroundColor: "#FEF3F3", borderRadius: 8, padding: 12, marginBottom: 16 }}>
            <Text style={{ fontSize: 13, color: "#C0514A" }}>{erro}</Text>
          </View>
        )}

        {/* Email */}
        <View style={s.fieldGroup}>
          <Text style={s.label}>E-mail</Text>
          <TextInput
            style={s.input}
            placeholder="seu@email.com"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Senha */}
        <View style={s.fieldGroup}>
          <Text style={s.label}>Senha</Text>
          <View style={{ position: "relative" }}>
            <TextInput
              style={[s.input, { paddingRight: 44 }]}
              placeholder="Sua senha"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!senhaVisivel}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity
              onPress={() => setSenhaVisivel(!senhaVisivel)}
              style={{ position: "absolute", right: 12, top: 12 }}
            >
              <EyeIcon visible={senhaVisivel} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão */}
        <TouchableOpacity style={s.btn} onPress={handleLogin} disabled={loading}>
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={s.btnText}>Entrar</Text>
          }
        </TouchableOpacity>

        <View style={s.footerRow}>
          <Text style={s.footerText}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => onNavegar("Cadastro")}>
            <Text style={s.footerLink}>Criar conta</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}
