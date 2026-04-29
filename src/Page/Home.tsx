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

export default function Home() {
  const { width } = useWindowDimensions();
  const styles = getStyles(width);

  const itensPorPagina = width < 768 ? 5 : 12;

  const [termos, setTermos] = useState([]);
  const [termosMestres, setTermosMestres] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [busca, setBusca] = useState("");
  const [ordem, setOrdem] = useState("relevancia");
  const [termoSelecionado, setTermoSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  let timer: NodeJS.Timeout;

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
              item.termo.toLowerCase().includes(texto.toLowerCase())
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
    indiceUltimoItem
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

  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Erro ao abrir link", err));
  };

  const labelOrdem = { relevancia: "Relevância", az: "A–Z", za: "Z–A" }[ordem];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={{ width: "100%", alignItems: "center" }}>

        {/* ── Topbar ── */}
        <View style={styles.Redes}>
          <View style={styles.grupoRedes}>
            <TouchableOpacity
              onPress={() =>
                handlePress("https://pt-br.facebook.com/lardonatoflores/")
              }
            >
              <svg style={styles.Redes_Icon} viewBox="0 0 24 24" fill="#fff">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                handlePress("https://www.instagram.com/lardonatoflores/")
              }
            >
              <svg style={styles.Redes_Icon} viewBox="0 0 24 24" fill="#fff">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 1.791-4 4-4 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                handlePress(
                  "https://youtube.com/channel/UC9LSvE2QU2SOJnjurUMW9_Q/videos"
                )
              }
            >
              <svg style={styles.Redes_Icon} viewBox="0 0 24 24" fill="#fff">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </TouchableOpacity>
          </View>

          <View style={styles.grupoContato}>
            <PhoneIcon />
            <Text style={styles.Text_Redes}>(15) 3251-1657</Text>
          </View>
        </View>

        {/* ── Navbar ── */}
        <View style={styles.navBarDiv}>
          <Image
            source={require("../../assets/Logo.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.TitleNav}>LAR DONATO FLORES</Text>
        </View>

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
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
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
                    style={{ fontSize: 11, fontWeight: "600", color: "#1A80B6" }}
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
                      borderColor:
                        paginaAtual === num ? "#1A80B6" : "#D8DCE6",
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
          />
        </View>
      </View>
    </ScrollView>
  );
}
