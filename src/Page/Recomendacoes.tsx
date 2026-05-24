import React, { useEffect, useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity,
  useWindowDimensions, ActivityIndicator,
} from "react-native";
import { RecomendacoesService } from "../server/recomendacoesService";
import { getStyles, Colors } from "../Styles/styleRecomendacoes";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Status = "pendente" | "aprovado" | "rejeitado";

interface Recomendacao {
  id: number;
  termo_en: string;
  termo_pt: string;
  significado: string;
  motivo_contexto: string;
  status: Status;
  data_envio: string;
  nome_usuario: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<Status, { label: string; bg: string; color: string }> = {
  pendente:  { label: "Pendente",  bg: Colors.pendenteBg,  color: Colors.pendenteColor  },
  aprovado:  { label: "Aprovado",  bg: Colors.aprovadoBg,  color: Colors.aprovadoColor  },
  rejeitado: { label: "Rejeitado", bg: Colors.rejeitadoBg, color: Colors.rejeitadoColor },
};

const formatarData = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

// ─── Filtros ──────────────────────────────────────────────────────────────────

const FILTROS: { key: Status | "todos"; label: string }[] = [
  { key: "todos",     label: "Todos"      },
  { key: "pendente",  label: "Pendentes"  },
  { key: "aprovado",  label: "Aprovados"  },
  { key: "rejeitado", label: "Rejeitados" },
];

// ─── Ícones ───────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke={Colors.aprovadoColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke={Colors.rejeitadoColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke={Colors.rejeitadoColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

// ─── Card de recomendação ─────────────────────────────────────────────────────

function CardRecomendacao({ item, onStatus, onDeletar, onCriar, loadingId, s }: {
  item: Recomendacao;
  onStatus: (id: number, status: Status) => void;
  onDeletar: (id: number) => void;
  onCriar: (item: Recomendacao) => void;
  loadingId: number | null;
  s: ReturnType<typeof getStyles>;
}) {
  const cfg = STATUS_CONFIG[item.status];
  const carregando = loadingId === item.id;

  return (
    <View style={s.card}>

      {/* Topo */}
      <View style={s.cardTopo}>
        <View style={s.cardTopoLeft}>
          <Text style={s.cardTermoEn}>{item.termo_en}</Text>
          <Text style={s.cardTermoPt}>{item.termo_pt}</Text>
        </View>
        <View style={[s.statusBadge, { backgroundColor: cfg.bg }]}>
          <Text style={[s.statusTexto, { color: cfg.color }]}>{cfg.label}</Text>
        </View>
      </View>

      {/* Conteúdo */}
      <View style={s.cardConteudo}>
        <View>
          <Text style={s.cardSecaoLabel}>Significado</Text>
          <Text style={s.cardSecaoTexto}>{item.significado}</Text>
        </View>
        <View>
          <Text style={s.cardSecaoLabel}>Motivo</Text>
          <Text style={s.cardSecaoTexto}>{item.motivo_contexto}</Text>
        </View>
      </View>

      {/* Rodapé */}
      <View style={s.cardRodape}>
        <Text style={s.cardRodapeUsuario}>
          Por <Text style={s.cardRodapeUsuarioNome}>{item.nome_usuario}</Text>
        </Text>
        <Text style={s.cardRodapeData}>{formatarData(item.data_envio)}</Text>
      </View>

      {/* Ações */}
      {carregando ? (
        <ActivityIndicator color={Colors.primary} style={{ alignSelf: "center" }} />
      ) : (
        <View style={s.acoesRow}>
          {item.status !== "aprovado" && (
            <TouchableOpacity style={s.btnAprovar} onPress={() => onStatus(item.id, "aprovado")}>
              <CheckIcon />
              <Text style={s.btnAprovarTexto}>Aprovar</Text>
            </TouchableOpacity>
          )}
          {item.status !== "rejeitado" && (
            <TouchableOpacity style={s.btnRejeitar} onPress={() => onStatus(item.id, "rejeitado")}>
              <XIcon />
              <Text style={s.btnRejeitarTexto}>Rejeitar</Text>
            </TouchableOpacity>
          )}
          {item.status !== "pendente" && (
            <TouchableOpacity style={s.btnPendente} onPress={() => onStatus(item.id, "pendente")}>
              <Text style={s.btnPendenteTexto}>Pendente</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={s.btnDeletar} onPress={() => onDeletar(item.id)}>
            <TrashIcon />
            <Text style={s.btnDeletarTexto}>Deletar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.btnCriar} onPress={() => onCriar(item)}>
            <PlusIcon />
            <Text style={s.btnCriarTexto}>Criar termo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────

export default function Recomendacoes({ onNavegar }: {
  onNavegar: (pagina: any, params?: any) => void;
}) {
  const { width } = useWindowDimensions();
  const s = getStyles(width);

  const [lista,     setLista]     = useState<Recomendacao[]>([]);
  const [filtro,    setFiltro]    = useState<Status | "todos">("todos");
  const [loading,   setLoading]   = useState(true);
  const [erro,      setErro]      = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);

  useEffect(() => { buscarTodos(); }, []);

  const buscarTodos = async () => {
    setLoading(true); setErro("");
    try {
      const data = await RecomendacoesService.getAll();
      setLista(data);
    } catch {
      setErro("Erro ao carregar recomendações.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id: number, status: Status) => {
    setLoadingId(id);
    try {
      const atualizado = await RecomendacoesService.updateStatus(id, status);
      setLista((prev) => prev.map((r) => r.id === id ? { ...r, status: atualizado.status } : r));
    } catch {
      setErro("Erro ao atualizar status.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeletar = async (id: number) => {
    setLoadingId(id);
    try {
      await RecomendacoesService.deletar(id);
      setLista((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setErro("Erro ao deletar recomendação.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleCriar = (item: Recomendacao) => {
    onNavegar("NovoTermo", {
      termo:     item.termo_en,
      traducao:  item.termo_pt,
      definicao: item.significado,
    });
  };

  const listaFiltrada = filtro === "todos"
    ? lista
    : lista.filter((r) => r.status === filtro);

  const contagem = {
    todos:     lista.length,
    pendente:  lista.filter((r) => r.status === "pendente").length,
    aprovado:  lista.filter((r) => r.status === "aprovado").length,
    rejeitado: lista.filter((r) => r.status === "rejeitado").length,
  };

  return (
    <ScrollView style={s.scroll} contentContainerStyle={s.content}>

      {/* Cabeçalho */}
      <View style={s.header}>
        <Text style={s.headerTitle}>Recomendações</Text>
        <Text style={s.headerSubtitle}>
          {lista.length} recomendação{lista.length !== 1 ? "s" : ""} no total
        </Text>
      </View>

      {/* Filtros */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filtrosScroll} contentContainerStyle={s.filtrosContent}>
        {FILTROS.map((f) => {
          const ativo = filtro === f.key;
          return (
            <TouchableOpacity key={f.key} onPress={() => setFiltro(f.key)} style={[ativo ? s.filtroBtnAtivo : s.filtroBtnInativo, { marginRight: 8 }]}>
              <Text style={ativo ? s.filtroTextoAtivo : s.filtroTextoInativo}>{f.label}</Text>
              <View style={ativo ? s.filtroBadgeAtivo : s.filtroBadgeInativo}>
                <Text style={ativo ? s.filtroBadgeTextoAtivo : s.filtroBadgeTextoInativo}>
                  {contagem[f.key]}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Erro */}
      {!!erro && (
        <View style={s.erroBox}>
          <Text style={s.erroTexto}>{erro}</Text>
        </View>
      )}

      {/* Conteúdo */}
      {loading ? (
        <View style={s.loadingBox}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={s.loadingTexto}>Carregando recomendações...</Text>
        </View>
      ) : listaFiltrada.length === 0 ? (
        <View style={s.loadingBox}>
          <Text style={s.vazioTexto}>
            {filtro === "todos" ? "Nenhuma recomendação ainda." : `Nenhuma recomendação ${filtro}.`}
          </Text>
        </View>
      ) : (
        <View>
          {listaFiltrada.map((item) => (
            <CardRecomendacao
              key={item.id}
              item={item}
              onStatus={handleStatus}
              onDeletar={handleDeletar}
              onCriar={handleCriar}
              loadingId={loadingId}
              s={s}
            />
          ))}
        </View>
      )}

    </ScrollView>
  );
}