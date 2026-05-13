import api from "./api.js";
 
export const TermsAdminService = {
 
  createTerm: async ({ termo, traducao, definicao, pronuncia, silabas,
                       exemplo, sinonimos, antonimos, imagem }) => {
    const form = new FormData();
    form.append("termo",     termo);
    form.append("traducao",  traducao);
    form.append("definicao", definicao);
    form.append("pronuncia", pronuncia  ?? "");
    form.append("silabas",   silabas    ?? "");
    form.append("exemplo",   JSON.stringify(exemplo   ?? null));
    form.append("sinonimos", JSON.stringify(sinonimos ?? null));
    form.append("antonimos", JSON.stringify(antonimos ?? null));
    if (imagem) form.append("imagem", imagem);
 
    // NÃO definir Content-Type manualmente — o browser injeta o boundary correto
    const response = await api.post("/terms", form);
    return response.data;
  },
 
  deleteTerm: async (id) => {
    const response = await api.delete(`/terms/${id}`);
    return response.data;
  },
};