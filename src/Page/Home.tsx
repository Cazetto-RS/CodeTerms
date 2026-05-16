import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Linking,
} from "react-native";
import ModalTermos from "./ModalTermos";
import React, { useEffect, useState } from "react";
import { TermsService } from "../server/apiService.js";
import { getStyles } from "../Styles/StyleHome";

// Ícone de lupa para o campo de busca
const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#9CA0AE"
    strokeWidth="2"
    strokeLinecap="round"
    style={{ width: 16, height: 16, flexShrink: 0 }}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

// Seta pequena para o botão "Ver mais"
const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1A80B6"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: 12, height: 12 }}
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// Ícone de telefone
const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="white"
    style={{ width: 13, height: 13, opacity: 0.8 }}
  >
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

interface Termo {
  id: number;
  termo: string;
  traducao: string;
  is_hidden: boolean;
}

type Ordem = "relevancia" | "az" | "za";

interface HomeProps {
  usuario?: any;
}

export default function Home({ usuario }: { usuario?: any }) {
  const { width } = useWindowDimensions();
  const styles = getStyles(width);

  const itensPorPagina = width < 768 ? 5 : 12;

  const [termos, setTermos] = useState<Termo[]>([]);
  const [termosMestres, setTermosMestres] = useState<Termo[]>([]);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [busca, setBusca] = useState<string>("");
  const [ordem, setOrdem] = useState<Ordem>("relevancia");
  const [termoSelecionado, setTermoSelecionado] = useState<Termo | null>(null);
  const [modalVisivel, setModalVisivel] = useState<boolean>(false);

  let timer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await TermsService.getTerms();
        setTermosMestres(data);
        setTermos(data.filter((item) => !item.is_hidden));
      } catch (error) {
        console.error("Erro ao buscar termos:", error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (texto: string) => {
    setBusca(texto);
    setPaginaAtual(1);
    clearTimeout(timer);
    timer = setTimeout(() => {
      const base =
        texto.length === 0
          ? termosMestres.filter((t) => !t.is_hidden)
          : termosMestres.filter((item) =>
              item.termo.toLowerCase().includes(texto.toLowerCase()),
            );
      setTermos(base);
    }, 300);
  };

  const termosOrdenados = [...termos].sort((a, b) => {
    if (ordem === "az") return a.traducao.localeCompare(b.traducao);
    if (ordem === "za") return b.traducao.localeCompare(a.traducao);
    return a.id - b.id;
  });

  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const itensPaginados = termosOrdenados.slice(
    indicePrimeiroItem,
    indiceUltimoItem,
  );

  const totalPaginas = Math.ceil(termosOrdenados.length / itensPorPagina);

  const getNumerosPagina = () => {
    const maxBotoes = 5;
    let start = Math.max(1, paginaAtual - Math.floor(maxBotoes / 2));
    let end = start + maxBotoes - 1;
    if (end > totalPaginas) {
      end = totalPaginas;
      start = Math.max(1, end - maxBotoes + 1);
    }
    const paginas = [];
    for (let i = start; i <= end; i++) paginas.push(i);
    return paginas;
  };

  const abrirModal = (termo) => {
    setTermoSelecionado(termo);
    setModalVisivel(true);
  };

  const labelOrdem = { relevancia: "Relevância", az: "A–Z", za: "Z–A" }[ordem];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        {/* ── Topbar ── */}

        {/* ── Conteúdo ── */}
        <View style={styles.content}>
          {/* Campo de busca com ícone */}
          <View style={styles.searchDiv}>
            <SearchIcon />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar no dicionário..."
              placeholderTextColor="#9CA0AE"
              value={busca}
              onChangeText={handleSearch}
            />
          </View>

          {/* Cabeçalho da seção */}
          <View style={styles.titleDiv}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Text style={styles.title}>Dicionário</Text>
              {termosOrdenados.length > 0 && (
                <View
                  style={{
                    backgroundColor: "#E8F3FB",
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "600",
                      color: "#1A80B6",
                    }}
                  >
                    {termosOrdenados.length} termos
                  </Text>
                </View>
              )}
            </View>

            <select
              value={ordem}
              onChange={(e) => {
                setOrdem(e.target.value);
                setPaginaAtual(1);
              }}
              style={{
                backgroundColor: "#fff",
                color: "#3A3E47",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 13,
                border: "1px solid #D8DCE6",
                cursor: "pointer",
              }}
            >
              <option value="relevancia">Relevância</option>
              <option value="az">A–Z</option>
              <option value="za">Z–A</option>
            </select>
          </View>

          {/* Grid de cards */}
          <View style={styles.Terms_MainDiv}>
            {itensPaginados.map((item) => (
              <View key={item.id} style={styles.TermsDiv}>
                <Text style={styles.title}>{item.termo}</Text>
                <Text style={styles.subtitle}>{item.traducao}</Text>

                <Text style={styles.description}>
                  {item.definicao.length > 80
                    ? `${item.definicao.substring(0, 80)}...`
                    : item.definicao}
                </Text>

                <TouchableOpacity
                  onPress={() => abrirModal(item)}
                  style={styles.moreDiv}
                >
                  <Text style={styles.more}>Ver mais</Text>
                  <ArrowIcon />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Paginação */}
          {totalPaginas > 1 && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 28,
                marginBottom: 16,
                gap: 6,
                alignItems: "center",
              }}
            >
              {paginaAtual > 1 && (
                <TouchableOpacity
                  onPress={() => setPaginaAtual(paginaAtual - 1)}
                  style={styles.Paginacao}
                >
                  <Text style={styles.BotaoPagina}>‹</Text>
                </TouchableOpacity>
              )}

              {getNumerosPagina().map((num) => (
                <TouchableOpacity
                  key={num}
                  onPress={() => setPaginaAtual(num)}
                  style={[
                    styles.Paginacao,
                    {
                      backgroundColor:
                        paginaAtual === num ? "#1A80B6" : "#FFFFFF",
                      borderColor: paginaAtual === num ? "#1A80B6" : "#D8DCE6",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.TextoPaginacao,
                      { color: paginaAtual === num ? "#FFFFFF" : "#3A3E47" },
                    ]}
                  >
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}

              {paginaAtual < totalPaginas && (
                <TouchableOpacity
                  onPress={() => setPaginaAtual(paginaAtual + 1)}
                  style={styles.Paginacao}
                >
                  <Text style={styles.BotaoPagina}>›</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          <ModalTermos
            visivel={modalVisivel}
            fechar={() => setModalVisivel(false)}
            termo={termoSelecionado}
            usuario={usuario}
            onDeletado={(id: number): void => {
              setTermos((prev: Termo[]) => prev.filter((t: Termo) => t.id !== id));
              setTermosMestres((prev: Termo[]) => prev.filter((t: Termo) => t.id !== id));
              setModalVisivel(false);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
