import api from "./api.js";

// Retorna a URL base atual do axios
const getBaseURL = () => api.defaults.baseURL || "https://codeterms-back.onrender.com";

// Retorna o token atual do header do axios
const getToken = () => api.defaults.headers.common?.["Authorization"] ?? "";

export const TermsAdminService = {

  // Usa fetch nativo — único jeito garantido de enviar multipart/form-data
  // com arquivo binário real no Expo Web
  createTerm: async ({
    termo, traducao, definicao, pronuncia, silabas,
    exemplo, sinonimos, antonimos, imagem,
  }) => {
    const form = new FormData();
    form.append("termo",     termo);
    form.append("traducao",  traducao);
    form.append("definicao", definicao);
    form.append("pronuncia", pronuncia  ?? "");
    form.append("silabas",   silabas    ?? "");
    form.append("exemplo",   JSON.stringify(exemplo   ?? null));
    form.append("sinonimos", JSON.stringify(sinonimos ?? null));
    form.append("antonimos", JSON.stringify(antonimos ?? null));

    // Anexa o arquivo — fetch nativo mantém o binário intacto
    if (imagem) {
      form.append("imagem", imagem, imagem.name);
    }

    const response = await fetch(`${getBaseURL()}/terms`, {
      method: "POST",
      headers: {
        // NÃO setar Content-Type — o fetch define o boundary automaticamente
        Authorization: getToken(),
      },
      body: form,
    });

    const data = await response.json();

    if (!response.ok) {
      // Lança um erro compatível com o catch do componente
      const err = new Error(data?.error ?? "Erro ao criar termo");
      err.response = { data };
      throw err;
    }

    return data;
  },

  updateTerm: async (id, dados) => {
    const response = await api.put(`/terms/${id}`, dados);
    return response.data;
  },

  deleteTerm: async (id) => {
    const response = await api.delete(`/terms/${id}`);
    return response.data;
  },
};
