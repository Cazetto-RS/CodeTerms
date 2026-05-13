import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { getStyles } from "../Styles/styleAuth";

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1A80B6"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 24, height: 24 }}
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const EyeIcon = ({ visible }: { visible: boolean }) =>
  visible ? (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 18, height: 18 }}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9CA3AF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 18, height: 18 }}
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

export default function Cadastro({
  onNavegar,
}: {
  onNavegar: (pagina: any) => void;
}) {
  const { width } = useWindowDimensions();
  const s = getStyles(width);

  const [nome, setNome] = useState("");
  const [anoNascimento, setAnoNascimento] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const anoAtual = new Date().getFullYear();
  const anoValido =
    anoNascimento.length === 4 &&
    Number(anoNascimento) >= 1900 &&
    Number(anoNascimento) <= anoAtual;

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.center}>
      <View style={s.cardCadastro}>
        <Text style={s.cardTitle}>Criar conta</Text>
        <Text style={s.cardSubtitle}>
          Preencha os dados abaixo para se cadastrar no CodeTerms.
        </Text>

        {/* Nome completo */}
        <View style={s.fieldGroup}>
          <Text style={s.label}>Nome completo</Text>
          <TextInput
            style={s.input}
            placeholder="Seu nome completo"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        {/* Ano de nascimento */}
        <View style={s.fieldGroup}>
          <Text style={s.label}>Ano de nascimento</Text>
          <TextInput
            style={[
              s.input,
              anoNascimento.length === 4 &&
                !anoValido && { borderColor: "#C0514A" },
            ]}
            placeholder="Ex: 2005"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
            maxLength={4}
            value={anoNascimento}
            onChangeText={setAnoNascimento}
          />
          {anoNascimento.length === 4 && !anoValido && (
            <Text style={[s.inputHint, { color: "#C0514A" }]}>
              Informe um ano válido (1900–{anoAtual})
            </Text>
          )}
        </View>

        {/* E-mail */}
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
              placeholder="Mínimo 6 caracteres"
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
          <Text style={s.inputHint}>Use letras, números ou símbolos.</Text>
        </View>

        {/* Botão */}
        <TouchableOpacity style={s.btn}>
          <Text style={s.btnText}>Criar conta</Text>
        </TouchableOpacity>

        {/* Rodapé */}
        <View style={s.footerRow}>
          <Text style={s.footerText}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => onNavegar("Login")}>
            <Text style={s.footerLink}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={s.espacamento}></View>
    </ScrollView>
  );
}
