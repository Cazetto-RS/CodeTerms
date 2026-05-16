import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { getStyles } from "../Styles/styleAuth";
import { TermsAdminService } from "../server/termsAdminService";

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1A80B6"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 24, height: 24 }}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const Campo = ({ label, hint = "", ...props }: any) => {
  const { width } = useWindowDimensions();
  const s = getStyles(width);
  return (
    <View style={s.fieldGroup}>
      <Text style={s.label}>{label}</Text>
      <TextInput style={s.input} placeholderTextColor="#9CA3AF" {...props} />
      {!!hint && <Text style={s.inputHint}>{hint}</Text>}
    </View>
  );
};

export default function NovoTermo({
  onNavegar,
}: {
  onNavegar: (pagina: any) => void;
}) {
  const { width } = useWindowDimensions();
  const s = getStyles(width);

  const [termo, setTermo] = useState("");
  const [traducao, setTraducao] = useState("");
  const [definicao, setDefinicao] = useState("");
  const [pronuncia, setPronuncia] = useState("");
  const [silabas, setSilabas] = useState("");
  const [sinonimos, setSinonimos] = useState("");
  const [antonimos, setAntonimos] = useState("");
  const [exemploEn, setExemploEn] = useState("");
  const [exemploPt, setExemploPt] = useState("");
  const [imagem, setImagem] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const handleImagem = (e: any) => {
    const file = e.target.files?.[0];
    if (file) setImagem(file);
  };

  const handleSalvar = async () => {
    setErro("");
    if (!termo || !traducao || !definicao) {
      setErro("Termo, tradução e definição são obrigatórios.");
      return;
    }

    // Monta exemplo como objeto se preenchido
    const exemplo = {
      en: exemploEn ? [exemploEn] : [],
      pt: exemploPt ? [exemploPt] : [],
    };

    // Sinonimos / antonimos como arrays separados por vírgula
    const toArr = (s: string) =>
      s.trim()
        ? s
            .split(",")
            .map((x) => x.trim())
            .filter(Boolean)
        : null;

    setLoading(true);
    try {
      await TermsAdminService.createTerm({
        termo,
        traducao,
        definicao,
        pronuncia,
        silabas,
        exemplo,
        sinonimos: toArr(sinonimos),
        antonimos: toArr(antonimos),
        imagem,
      });
      setSucesso(true);
    } catch (e: any) {
      const msg = e?.response?.data?.error ?? "Erro ao salvar termo.";
      setErro(msg);
    } finally {
      setLoading(false);
    }
  };

  if (sucesso) {
    return (
      <ScrollView style={s.scroll} contentContainerStyle={s.center}>
        <View style={s.card}>
          <View style={[s.cardIcon, { backgroundColor: "#EDFAF3" }]}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2E7D57"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: 24, height: 24 }}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </View>
          <Text style={s.cardTitle}>Termo adicionado!</Text>
          <Text style={s.cardSubtitle}>
            O novo termo foi salvo com sucesso no dicionário.
          </Text>
          <TouchableOpacity
            style={s.btn}
            onPress={() => {
              setSucesso(false);
              setTermo("");
              setTraducao("");
              setDefinicao("");
              setPronuncia("");
              setSilabas("");
              setSinonimos("");
              setAntonimos("");
              setExemploEn("");
              setExemploPt("");
              setImagem(null);
            }}
          >
            <Text style={s.btnText}>Adicionar outro</Text>
          </TouchableOpacity>
          <View style={s.footerRow}>
            <TouchableOpacity onPress={() => onNavegar("Home")}>
              <Text style={s.footerLink}>Voltar ao dicionário</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.center}>
      <View style={s.cardNovo}>
        <Text style={s.cardTitle}>Novo termo</Text>
        <Text style={s.cardSubtitle}>
          Preencha os dados do novo termo do dicionário.
        </Text>

        {!!erro && (
          <View
            style={{
              backgroundColor: "#FEF3F3",
              borderRadius: 8,
              padding: 12,
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 13, color: "#C0514A" }}>{erro}</Text>
          </View>
        )}

        <View style={s.CardDirecao}>
          <View style={{ flex: 1 }}>
            {/* Obrigatórios */}
            <Campo
              label="Termo *"
              placeholder="Ex: Array"
              value={termo}
              onChangeText={setTermo}
            />
            <Campo
              label="Tradução *"
              placeholder="Ex: Arranjo"
              value={traducao}
              onChangeText={setTraducao}
            />

            <Campo
              label="Pronúncia"
              placeholder="Ex: /əˈreɪ/"
              value={pronuncia}
              onChangeText={setPronuncia}
            />
            <Campo
              label="Sílabas"
              placeholder="Ex: ar·ray"
              value={silabas}
              onChangeText={setSilabas}
            />

            <View style={s.fieldGroup}>
              <Text style={s.label}>Definição *</Text>
              <TextInput
                style={[
                  s.input,
                  { height: 90, textAlignVertical: "top", paddingTop: 10 },
                ]}
                placeholder="Descreva o que este termo significa..."
                placeholderTextColor="#9CA3AF"
                multiline
                value={definicao}
                onChangeText={setDefinicao}
              />
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Campo
              label="Exemplo em inglês"
              placeholder="Ex: Create an array of numbers."
              value={exemploEn}
              onChangeText={setExemploEn}
            />
            <Campo
              label="Exemplo em português"
              placeholder="Ex: Crie um arranjo de números."
              value={exemploPt}
              onChangeText={setExemploPt}
            />
            <Campo
              label="Sinônimos"
              hint="Separe por vírgula. Ex: List, Collection"
              placeholder="Ex: List, Collection"
              value={sinonimos}
              onChangeText={setSinonimos}
            />
            <Campo
              label="Antônimos"
              hint="Separe por vírgula."
              placeholder="Ex: Scalar"
              value={antonimos}
              onChangeText={setAntonimos}
            />

            {/* Upload de imagem */}
            <View style={s.fieldGroup}>
              <Text style={s.label}>Imagem</Text>
              <label style={{ display: "block" }}>
                <View
                  style={[
                    s.input,
                    {
                      alignItems: "center",
                      justifyContent: "center",
                      height: 44,
                      cursor: "pointer",
                    } as any,
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: imagem ? "#131417" : "#9CA3AF",
                    }}
                  >
                    {imagem ? imagem.name : "Selecionar imagem (JPG, PNG)"}
                  </Text>
                </View>
                <input
                  type="file"
                  accept="image/jpg,image/jpeg,image/png"
                  style={{ display: "none" }}
                  onChange={handleImagem}
                />
              </label>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={s.btn}
          onPress={handleSalvar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={s.btnText}>Salvar termo</Text>
          )}
        </TouchableOpacity>

        <View style={s.footerRow}>
          <TouchableOpacity onPress={() => onNavegar("Home")}>
            <Text style={s.footerLink}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={s.espacamento}></View>
    </ScrollView>
  );
}
