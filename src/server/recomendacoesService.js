import api from "./api.js";

export const RecomendacoesService = {

  // Envia uma recomendação (usuário logado)
  create: async ({ termo_en, termo_pt, significado, motivo_contexto }) => {
    const response = await api.post("/recomendar/", {
      termo_en, termo_pt, significado, motivo_contexto,
    });
    return response.data;
  },

  // Lista todas (admin)
  getAll: async () => {
    const response = await api.get("/recomendar/");
    return response.data;
  },

  // Altera status (admin)
  updateStatus: async (id, status) => {
    const response = await api.patch(`/recomendar/${id}/status`, { status });
    return response.data;
  },

  // Deleta (admin)
  deletar: async (id) => {
    const response = await api.delete(`/recomendar/${id}`);
    return response.data;
  },
};
