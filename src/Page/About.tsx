import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="#E25B5B" style={{ width: 18, height: 18 }}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1A80B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1A80B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1A80B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1A80B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const PillarCard = ({ icon, title, description, isDesktop }) => (
  <View style={[pillarStyles.card, isDesktop && pillarStyles.cardDesktop]}>
    <View style={pillarStyles.iconWrapper}>{icon}</View>
    <Text style={pillarStyles.title}>{title}</Text>
    <Text style={pillarStyles.description}>{description}</Text>
  </View>
);

const pillarStyles = StyleSheet.create({
  card: {
    backgroundColor: "#F7F9FC",
    borderRadius: 14,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E8ECF2",
    marginBottom: 12,
  },
  cardDesktop: {
    flex: 1,
    marginBottom: 0,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#EBF5FB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1A1D24",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
  },
});

export default function About() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;
  const hPad = isDesktop ? Math.min((width - 900) / 2, 120) : 20;

  const handleLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Erro ao abrir link", err));
  };

  const sectionStyle = {
    paddingHorizontal: hPad,
    paddingTop: isDesktop ? 64 : 44,
    paddingBottom: isDesktop ? 56 : 40,
    backgroundColor: "#fff",
    marginTop: 12,
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#F7F8FA" }}>

      {/* ── Hero ── */}
      <View style={{ paddingHorizontal: hPad, paddingTop: isDesktop ? 64 : 40, paddingBottom: isDesktop ? 52 : 36, backgroundColor: "#fff" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#FEF3F3", alignSelf: "flex-start", paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, marginBottom: 24 }}>
          <HeartIcon />
          <Text style={{ fontSize: 13, color: "#C0514A", fontWeight: "600" }}>Transformando vidas através da tecnologia</Text>
        </View>

        <Text style={{ fontSize: isDesktop ? 52 : 34, fontWeight: "800", color: "#1A1D24", lineHeight: isDesktop ? 62 : 44, marginBottom: 20, letterSpacing: -1 }}>
          Sobre o{"\n"}
          <Text style={{ color: "#1A80B6" }}>CodeTerms</Text>
        </Text>

        <Text style={{ fontSize: isDesktop ? 18 : 15, color: "#6B7280", lineHeight: isDesktop ? 30 : 24, maxWidth: 640 }}>
          Uma iniciativa que une tecnologia, educação e esperança — levando o
          vocabulário do mundo digital até as crianças e adolescentes do Lar
          Donato Flores, em parceria com a FATEC Tatuí.
        </Text>
      </View>

      {/* ── Imagem principal ── */}
      <View style={{ marginHorizontal: hPad, marginTop: 32, marginBottom: 0, position: "relative" }}>
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80"
          alt="Crianças aprendendo juntas"
          style={{ width: "100%", height: isDesktop ? 420 : 220, objectFit: "cover", borderRadius: 16, display: "block" }}
        />
        <View style={{ position: "absolute", bottom: 12, left: 12, backgroundColor: "rgba(0,0,0,0.5)", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 }}>
          <Text style={{ color: "#fff", fontSize: 12 }}>Lar Donato Flores · Tatuí, São Paulo</Text>
        </View>
      </View>

      {/* ── Sobre o Lar ── */}
      <View style={sectionStyle}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#1A80B6" }} />
          <Text style={{ fontSize: 13, fontWeight: "600", color: "#1A80B6", textTransform: "uppercase", letterSpacing: 0.8 }}>Nossa história</Text>
        </View>

        <Text style={{ fontSize: isDesktop ? 32 : 24, fontWeight: "800", color: "#1A1D24", letterSpacing: -0.5, marginBottom: 20 }}>O Lar Donato Flores</Text>

        <View style={isDesktop ? { flexDirection: "row", gap: 32 } : {}}>
          <Text style={{ fontSize: 15, color: "#4B5563", lineHeight: 26, marginBottom: 14, flex: isDesktop ? 1 : undefined }}>
            Há décadas, o Lar Donato Flores atua em Tatuí — SP como uma Entidade
            Beneficente de Assistência Social dedicada ao atendimento direto de
            crianças e adolescentes em situação de vulnerabilidade. Seu trabalho
            vai além das paredes de uma instituição: é um compromisso com a
            garantia de direitos, o fortalecimento de vínculos familiares e a
            construção de futuros possíveis.
          </Text>
          <Text style={{ fontSize: 15, color: "#4B5563", lineHeight: 26, flex: isDesktop ? 1 : undefined }}>
            Por meio de programas como o{" "}
            <Text style={{ fontWeight: "700", color: "#1A1D24" }}>Lar Espaço Feliz</Text>{" "}
            e o{" "}
            <Text style={{ fontWeight: "700", color: "#1A1D24" }}>Programa Aprendiz</Text>
            , o Lar oferece espaços de convivência, apoio psicossocial, formação
            cultural e preparação para o mercado de trabalho — sempre com olhar
            humano e comprometido com cada jovem atendido.
          </Text>
        </View>
      </View>

      {/* ── Stats ── */}
      <View style={{ flexDirection: "row", paddingHorizontal: hPad, paddingVertical: 28, backgroundColor: "#EBF5FB", gap: 12 }}>
        {[
          { num: "30+", lbl: "Anos de história" },
          { num: "Centenas", lbl: "De jovens atendidos" },
          { num: "Tatuí/SP", lbl: "Coração da ação" },
        ].map((s) => (
          <View key={s.lbl} style={{ flex: 1, alignItems: "center", paddingVertical: 20, backgroundColor: "#fff", borderRadius: 12 }}>
            <Text style={{ fontSize: isDesktop ? 24 : 17, fontWeight: "800", color: "#1A80B6", marginBottom: 4 }}>{s.num}</Text>
            <Text style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center" }}>{s.lbl}</Text>
          </View>
        ))}
      </View>

      {/* ── Sobre o projeto (fundo azul) ── */}
      <View style={{ paddingHorizontal: hPad, paddingTop: isDesktop ? 64 : 44, paddingBottom: isDesktop ? 64 : 44, backgroundColor: "#1A80B6", marginTop: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.7)" }} />
          <Text style={{ fontSize: 13, fontWeight: "600", color: "rgba(255,255,255,0.8)", textTransform: "uppercase", letterSpacing: 0.8 }}>O projeto</Text>
        </View>

        <Text style={{ fontSize: isDesktop ? 32 : 24, fontWeight: "800", color: "#fff", letterSpacing: -0.5, marginBottom: 20 }}>O que é o CodeTerms?</Text>

        <Text style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 26, marginBottom: 16 }}>
          O{" "}
          <Text style={{ fontWeight: "700", color: "#fff" }}>CodeTerms</Text>{" "}
          é um dicionário digital de termos em inglês da área de tecnologia,
          desenvolvido especialmente para os jovens atendidos pelo Lar Donato
          Flores. Mais do que uma lista de palavras, é uma ferramenta de
          inclusão: ao conhecer o vocabulário do universo digital, esses jovens
          ganham confiança e preparo para ingressar em um mercado de trabalho
          cada vez mais conectado.
        </Text>

        <Text style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 26 }}>
          Cada termo vem acompanhado de tradução, definição clara, exemplos
          práticos em português e inglês, sinônimos e antônimos — tudo pensado
          para tornar o aprendizado acessível, envolvente e aplicável ao
          cotidiano.
        </Text>
      </View>

      {/* ── Pilares ── */}
      <View style={sectionStyle}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#1A80B6" }} />
          <Text style={{ fontSize: 13, fontWeight: "600", color: "#1A80B6", textTransform: "uppercase", letterSpacing: 0.8 }}>Como funciona</Text>
        </View>

        <Text style={{ fontSize: isDesktop ? 32 : 24, fontWeight: "800", color: "#1A1D24", letterSpacing: -0.5, marginBottom: 20 }}>Os pilares do projeto</Text>

        <View style={isDesktop ? { flexDirection: "row", gap: 16 } : {}}>
          <PillarCard icon={<BookIcon />} title="Dicionário técnico" description="Termos em inglês da tecnologia com definições claras, exemplos reais e pronúncia — do básico ao avançado." isDesktop={isDesktop} />
          <PillarCard icon={<CodeIcon />} title="Foco em empregabilidade" description="Vocabulário alinhado às exigências do mercado de TI, preparando jovens para entrevistas e ambientes profissionais." isDesktop={isDesktop} />
          <PillarCard icon={<UsersIcon />} title="Linguagem acessível" description="Conteúdo pensado para quem está começando — sem jargão desnecessário, com exemplos do dia a dia." isDesktop={isDesktop} />
          <PillarCard icon={<GlobeIcon />} title="Bilíngue e interativo" description="Exemplos em português e inglês lado a lado, com recurso de ouvir a pronúncia correta de cada termo." isDesktop={isDesktop} />
        </View>
      </View>

      {/* ── FATEC ── */}
      <View style={sectionStyle}>
        <View style={isDesktop ? { flexDirection: "row", alignItems: "center", gap: 48 } : {}}>
          <View style={isDesktop ? { flex: 1 } : {}}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#1A80B6" }} />
              <Text style={{ fontSize: 13, fontWeight: "600", color: "#1A80B6", textTransform: "uppercase", letterSpacing: 0.8 }}>Parceria acadêmica</Text>
            </View>

            <Text style={{ fontSize: isDesktop ? 32 : 24, fontWeight: "800", color: "#1A1D24", letterSpacing: -0.5, marginBottom: 20 }}>Em parceria com a FATEC Tatuí</Text>

            <Text style={{ fontSize: 15, color: "#4B5563", lineHeight: 26, marginBottom: 14 }}>
              Este projeto nasceu da parceria entre o Lar Donato Flores e a{" "}
              <Text style={{ fontWeight: "700", color: "#1A1D24" }}>Faculdade de Tecnologia de Tatuí (FATEC Tatuí)</Text>
              , proposto pelo professor Sid como trabalho prático para os alunos do curso de tecnologia.
            </Text>

            <Text style={{ fontSize: 15, color: "#4B5563", lineHeight: 26, marginBottom: 24 }}>
              A parceria une o conhecimento técnico e criativo dos estudantes universitários com
              o propósito social do Lar — demonstrando que a academia pode ser um agente de
              transformação real na comunidade em que está inserida.
            </Text>

            <TouchableOpacity
              onPress={() => handleLink("https://fatectatui.edu.br")}
              style={{ flexDirection: "row", alignItems: "center", gap: 8, alignSelf: "flex-start", paddingHorizontal: 20, paddingVertical: 12, borderRadius: 8, borderWidth: 1.5, borderColor: "#1A80B6" }}
            >
              <Text style={{ fontSize: 14, fontWeight: "600", color: "#1A80B6" }}>Conheça a FATEC Tatuí</Text>
              <svg viewBox="0 0 24 24" fill="none" stroke="#1A80B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </TouchableOpacity>
          </View>

          <View style={isDesktop ? { flex: 1 } : { marginTop: 32 }}>
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
              alt="Alunos universitários em projeto colaborativo"
              style={{ width: "100%", height: isDesktop ? 320 : 200, objectFit: "cover", borderRadius: 14, display: "block" }}
            />
          </View>
        </View>
      </View>

      {/* ── Time ── */}
      <View style={sectionStyle}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#1A80B6" }} />
          <Text style={{ fontSize: 13, fontWeight: "600", color: "#1A80B6", textTransform: "uppercase", letterSpacing: 0.8 }}>Quem fez acontecer</Text>
        </View>

        <Text style={{ fontSize: isDesktop ? 32 : 24, fontWeight: "800", color: "#1A1D24", letterSpacing: -0.5, marginBottom: 20 }}>Desenvolvido com propósito</Text>

        <Text style={{ fontSize: 15, color: "#4B5563", lineHeight: 26, marginBottom: 14 }}>
          O CodeTerms foi desenvolvido por alunos da FATEC Tatuí como projeto curricular,
          orientado pelo{" "}
          <Text style={{ fontWeight: "700", color: "#1A1D24" }}>Prof. Sid</Text>
          , com o compromisso de criar algo funcional, bonito e genuinamente útil para os jovens do Lar.
        </Text>
        <Text style={{ fontSize: 15, color: "#4B5563", lineHeight: 26 }}>
          Cada linha de código carrega a intenção de contribuir — e a consciência de que
          tecnologia, quando bem direcionada, é uma das mais poderosas ferramentas de inclusão social.
        </Text>
      </View>

      {/* ── CTA final ── */}
      <View style={{ paddingHorizontal: hPad, paddingTop: isDesktop ? 56 : 40, paddingBottom: isDesktop ? 56 : 40, marginTop: 12, backgroundColor: "#1A1D24" }}>
        <Text style={{ fontSize: isDesktop ? 30 : 22, fontWeight: "800", color: "#fff", marginBottom: 12, letterSpacing: -0.5 }}>Conheça o Lar Donato Flores</Text>
        <Text style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 24, maxWidth: 480, marginBottom: 28 }}>
          Saiba mais sobre o trabalho social, apoie a causa ou entre em contato com a equipe.
        </Text>
        <TouchableOpacity
          onPress={() => handleLink("https://lardonatoflores.org.br/v3/")}
          style={{ flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#1A80B6", paddingHorizontal: 24, paddingVertical: 14, borderRadius: 8, alignSelf: "flex-start" }}
        >
          <Text style={{ fontSize: 15, fontWeight: "700", color: "#fff" }}>Acessar o site oficial</Text>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </TouchableOpacity>
      </View>

      <View style={{ height: 48 }} />
    </ScrollView>
  );
}
