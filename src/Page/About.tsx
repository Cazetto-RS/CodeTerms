import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking, useWindowDimensions } from "react-native";
import { getStyles } from "../Styles/styleAbout";

// ─── Ícones ───────────────────────────────────────────────────────────────────

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" fill="#1A80B6" style={{ width: 18, height: 18 }}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" />
  </svg>
);
const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1A80B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1A80B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1A80B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1A80B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const ArrowIcon = ({ stroke = "#1A80B6" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

// ─── Dados ────────────────────────────────────────────────────────────────────

const STATS = [
  { num: "30+",      lbl: "Anos de história"    },
  { num: "Centenas", lbl: "De jovens atendidos" },
  { num: "Tatuí/SP", lbl: "Coração da ação"     },
];

const PILLARS = [
  { icon: <BookIcon />,  title: "Dicionário técnico",      description: "Termos em inglês da tecnologia com definições claras, exemplos reais e pronúncia — do básico ao avançado." },
  { icon: <CodeIcon />,  title: "Foco em empregabilidade", description: "Vocabulário alinhado às exigências do mercado de TI, preparando jovens para entrevistas e ambientes profissionais." },
  { icon: <UsersIcon />, title: "Linguagem acessível",     description: "Conteúdo pensado para quem está começando — sem jargão desnecessário, com exemplos do dia a dia." },
  { icon: <GlobeIcon />, title: "Bilíngue e interativo",   description: "Exemplos em português e inglês lado a lado, com recurso de ouvir a pronúncia correta de cada termo." },
];

// ─── Componente ───────────────────────────────────────────────────────────────

export default function About() {
  const { width } = useWindowDimensions();
  const style = getStyles(width);

  const openLink = (url: string) => Linking.openURL(url);

  return (
    <ScrollView style={style.scroll}>

      {/* Hero */}
      <View style={style.hero}>
        <View style={style.heroBadge}>
          <HeartIcon />
          <Text style={style.heroBadgeText}>Uma parceria entre Lar Donato Flores e Fatec Tatuí </Text>
        </View>
        <Text style={style.heroTitle}>
          Sobre o{"\n"}<Text style={style.heroTitleBlue}>Projeto CodeTerms</Text>
        </Text>
        <Text style={style.heroSubtitle}>
          Uma iniciativa que une tecnologia, educação e esperança — levando o vocabulário do
          mundo digital até as crianças e adolescentes do Lar Donato Flores, em parceria com a FATEC Tatuí.
        </Text>
      </View>

      {/* Imagem */}
      <View style={style.imageWrapper}>
        <img
          src="https://lardonatoflores.org.br/v3/wp-content/uploads/2021/03/school-G67VVJC-scaled.jpg"
          alt="Crianças aprendendo juntas"
          style={{ width: "100%", height: width > 768 ? 420 : 220, objectFit: "cover", borderRadius: 16, display: "block" }}
        />
        <View style={style.imageCaption}>
          <Text style={style.imageCaptionText}>Lar Donato Flores · Tatuí, São Paulo</Text>
        </View>
      </View>

      {/* Sobre o Lar */}
      <View style={style.section}>
        <View style={style.sectionHeader}>
          <View style={style.dot} /><Text style={style.tag}>Nossa história</Text>
        </View>
        <Text style={style.sectionTitle}>O Lar Donato Flores</Text>
        <View style={style.row}>
          <Text style={style.body}>
            Fundado em 1961, o Lar Donato Flores atua em Tatuí — SP como uma Entidade Beneficente de
            Assistência Social dedicada ao atendimento direto de crianças e adolescentes em situação
            de vulnerabilidade. Seu trabalho vai além das paredes de uma instituição: é um compromisso
            com a garantia de direitos, o fortalecimento de vínculos familiares e a construção de futuros possíveis.
          </Text>
          <Text style={style.body}>
            Por meio de programas como o <Text style={style.bold}>Lar Espaço Feliz</Text> e o{" "}
            <Text style={style.bold}>Programa Aprendiz</Text>, o Lar oferece espaços de convivência,
            apoio psicossocial, formação cultural e preparação para o mercado de trabalho — sempre
            com olhar humano e comprometido com cada jovem atendido.
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={style.statsRow}>
        {STATS.map((item) => (
          <View key={item.lbl} style={style.statCard}>
            <Text style={style.statNumber}>{item.num}</Text>
            <Text style={style.statLabel}>{item.lbl}</Text>
          </View>
        ))}
      </View>

      {/* O que é o CodeTerms */}
      <View style={style.sectionBlue}>
        <View style={style.sectionHeader}>
          <View style={style.dotWhite} /><Text style={style.tagWhite}>O projeto</Text>
        </View>
        <Text style={style.sectionTitleWhite}>O que é o CodeTerms?</Text>
        <Text style={style.bodyWhite}>
          O <Text style={style.boldWhite}>CodeTerms</Text> é um dicionário digital de termos em inglês
          da área de tecnologia, desenvolvido especialmente para os jovens atendidos pelo Lar Donato
          Flores. Mais do que uma lista de palavras, é uma ferramenta de inclusão: ao conhecer o
          vocabulário do universo digital, esses jovens ganham confiança e preparo para ingressar
          em um mercado de trabalho cada vez mais conectado.
        </Text>
        <Text style={style.bodyWhite}>
          Cada termo vem acompanhado de tradução, definição clara, exemplos práticos em português
          e inglês, sinônimos e antônimos — tudo pensado para tornar o aprendizado acessível,
          envolvente e aplicável ao cotidiano.
        </Text>
      </View>

      {/* Pilares */}
      <View style={style.section}>
        <View style={style.sectionHeader}>
          <View style={style.dot} /><Text style={style.tag}>Como funciona</Text>
        </View>
        <Text style={style.sectionTitle}>Os pilares do projeto</Text>
        <View style={style.pillarsRow}>
          {PILLARS.map((p) => (
            <View key={p.title} style={style.pillarCard}>
              <View style={style.pillarIcon}>{p.icon}</View>
              <Text style={style.pillarTitle}>{p.title}</Text>
              <Text style={style.pillarDescription}>{p.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* FATEC */}
      <View style={style.section}>
        <View style={style.fatecRow}>
          <View style={style.fatecCol}>
            <View style={style.sectionHeader}>
              <View style={style.dot} /><Text style={style.tag}>Parceria acadêmica</Text>
            </View>
            <Text style={style.sectionTitle}>Em parceria com a FATEC Tatuí</Text>
            <Text style={style.body}>
              Este projeto nasceu da parceria entre o Lar Donato Flores e a{" "}
              <Text style={style.bold}>Faculdade de Tecnologia de Tatuí (FATEC Tatuí)</Text>, proposto
              pelo professor Sidinei Aparecido O. Vieira como trabalho prático para os alunos do curso de tecnologia.
            </Text>
            <Text style={style.body}>
              A parceria une o conhecimento técnico e criativo dos estudantes universitários com o
              propósito social do Lar — demonstrando que a academia pode ser um agente de
              transformação real na comunidade em que está inserida.
            </Text>
            <TouchableOpacity style={style.fatecBtn} onPress={() => openLink("https://fatectatui.edu.br")}>
              <Text style={style.fatecBtnText}>Conheça a FATEC Tatuí</Text>
              <ArrowIcon />
            </TouchableOpacity>
          </View>
          <View style={style.fatecImageCol}>
            <img
              src="https://bkpsitecpsnew.blob.core.windows.net/uploadsitecps/sites/1/2020/10/fatectatui-02.jpg"
              alt="Alunos universitários em projeto colaborativo"
              style={{ width: "100%", height: width > 768 ? 320 : 200, objectFit: "cover", borderRadius: 14, display: "block" }}
            />
          </View>
        </View>
      </View>

      {/* Desenvolvido com propósito */}
      <View style={style.section}>
        <View style={style.sectionHeader}>
          <View style={style.dot} /><Text style={style.tag}>Quem fez acontecer</Text>
        </View>
        <Text style={style.sectionTitle}>Desenvolvido com propósito</Text>
        <Text style={style.body}>
          O CodeTerms foi desenvolvido por alunos da FATEC Tatuí como projeto curricular,
          orientado pelo <Text style={style.bold}>Prof. Sidinei Aparecido O. Vieira</Text>, com o compromisso de criar algo
          funcional, bonito e genuinamente útil para os jovens do Lar.
        </Text>
        <Text style={style.body}>
          Cada linha de código carrega a intenção de contribuir e a consciência de que tecnologia,
          quando bem direcionada, é uma das mais poderosas ferramentas de inclusão social.
        </Text>
      </View>

      {/* CTA */}
      <View style={style.cta}>
        <Text style={style.ctaTitle}>Conheça o Lar Donato Flores</Text>
        <Text style={style.ctaSubtitle}>
          Saiba mais sobre o trabalho social, apoie a causa ou entre em contato com a equipe.
        </Text>
        <TouchableOpacity style={style.ctaBtn} onPress={() => openLink("https://lardonatoflores.org.br/v3/")}>
          <Text style={style.ctaBtnText}>Acessar o site oficial</Text>
          <ArrowIcon stroke="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
