import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import ModalTermos from "./ModalTermos";
import React, { useEffect, useState } from "react";
import { TermsService } from "../server/apiService.js";
// import styles from "../Styles/StyleHome";
import { getStyles } from "../Styles/StyleHome";

export default function () {
  // Obtendo a largura da tela para aplicar estilos responsivos
  const { width } = useWindowDimensions();
  const styles = getStyles(width);

  let timer: NodeJS.Timeout;

  // Estado para armazenar os termos
  const [termos, setTermos] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await TermsService.getTerms();
        // Filtra para mostrar apenas o que NÃO é hidden
        const visiveis = data.filter((item) => !item.is_hidden);
        setTermos(visiveis);
      } catch (error) {
        console.error("Erro ao buscar termos:", error);
      }
    }
    fetchData();
  }, []);

  // Estado para pesquisar por termos
  const [busca, setBusca] = useState("");
  const handleSearch = async (texto: string) => {
    setBusca(texto);
    clearTimeout(timer);

    timer = setTimeout(async () => {
      if (texto.length === 0) {
        // Volta para a lista visível padrão
        setTermos(termosMestres.filter((t) => !t.is_hidden));
      } else {
        // Busca em TODOS, permitindo encontrar o "is_hidden"
        const resultados = termosMestres.filter((item) =>
          item.termo.toLowerCase().includes(texto.toLowerCase()),
        );
        setTermos(resultados);
      }
    }, 300);
  };

  // Estado para abrir o modal de detalhes do termo
  const [termoSelecionado, setTermoSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const abrirModal = (termo) => {
    setTermoSelecionado(termo);
    setModalVisivel(true);
  };

  //Guarda tudo!
  const [termosMestres, setTermosMestres] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await TermsService.getTerms();
      setTermosMestres(data); // Guarda tudo, inclusive o escondido
      setTermos(data.filter((t) => !t.is_hidden)); // Mostra só os visíveis
    }
    fetchData();
  }, []);

  //Filtrar os termos por ordem alfabética ou relevância
  const [ordem, setOrdem] = useState("relevancia");
  const termosOrdenados = [...termos].sort((a, b) => {
    if (ordem === "az") {
      return a.traducao.localeCompare(b.traducao);
    } else if (ordem === "za") {
      return b.traducao.localeCompare(a.traducao);
    }
    return a.id - b.id; // Se for 'relevancia', retorna a ordem original do banco (pelo ID)
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={styles.navBarDiv}>
          <Image
            source={require("../../assets/Logo.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <View style={[styles.searchDiv, styles.border]}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar no Dicionário..."
              value={busca}
              onChangeText={handleSearch}
            />
            <svg
              width="16"
              height="16"
              viewBox="0 0 14 12"
              style={styles.svgBar}
            >
              <path
                d="M12.9111 12L8.01111 7.8C7.62222 8.06667 7.175 8.27778 6.66945 8.43333C6.16389 8.58889 5.62593 8.66667 5.05556 8.66667C3.64259 8.66667 2.44689 8.24711 1.46844 7.408C0.49 6.56889 0.00051893 5.544 4.11523e-07 4.33333C-0.000518107 3.12267 0.488963 2.09778 1.46844 1.25867C2.44793 0.419556 3.64363 0 5.05556 0C6.46748 0 7.66345 0.419556 8.64345 1.25867C9.62345 2.09778 10.1127 3.12267 10.1111 4.33333C10.1111 4.82222 10.0204 5.28333 9.83889 5.71667C9.65741 6.15 9.41111 6.53333 9.1 6.86667L14 11.0667L12.9111 12ZM5.05556 7.33333C6.02778 7.33333 6.8543 7.04178 7.53511 6.45867C8.21593 5.87556 8.55608 5.16711 8.55556 4.33333C8.55504 3.49956 8.21489 2.79133 7.53511 2.20867C6.85533 1.626 6.02882 1.33422 5.05556 1.33333C4.0823 1.33244 3.25604 1.62422 2.57678 2.20867C1.89752 2.79311 1.55711 3.50133 1.55556 4.33333C1.554 5.16533 1.89441 5.87378 2.57678 6.45867C3.25915 7.04356 4.08541 7.33511 5.05556 7.33333Z"
                className="cls-1"
                fill="#56575B"
              />
            </svg>
          </View>
        </View>
        <View style={styles.content}>
          <View
            style={[
              styles.titleDiv,
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
          >
            <Text style={styles.title}>Buscar no dicionário</Text>
            <select
              value={ordem}
              onChange={(e) => setOrdem(e.target.value)}
              style={{
                backgroundColor: "#1A1B1F",
                color: "#e4edf2",
                border: "1px solid #00000000",
                borderRadius: 5,
                padding: 5,
                fontSize: 14,
              }}
            >
              <option value="relevancia">Relevância</option>
              <option value="az">A-Z</option>
              <option value="za">Z-A</option>
            </select>
          </View>
          <View style={styles.Terms_MainDiv}>
            {termosOrdenados.map((item) => (
              <View
                key={item.id}
                style={[styles.TermsDiv, styles.border, { marginBottom: 15 }]}
              >
                <Text style={styles.title}>{item.termo}</Text>
                <Text style={styles.subtitle}>{item.traducao}</Text>
                <Text style={styles.description}>
                  {item.definicao.length > 70
                    ? `${item.definicao.substring(0, 70)}...`
                    : item.definicao}
                </Text>
                <View style={styles.moreDiv}>
                  <TouchableOpacity
                    onPress={() => abrirModal(item)}
                    style={styles.moreDiv}
                  >
                    <Text style={styles.more}>Ver mais</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

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
