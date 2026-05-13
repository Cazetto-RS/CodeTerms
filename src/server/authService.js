import api from "./api.js";
 
// ─── Helpers de storage (web usa localStorage, nativo usa AsyncStorage) ───────
// Como o projeto roda em web (Vercel), localStorage é suficiente.
 
const TOKEN_KEY = "ct_token";
const USER_KEY  = "ct_user";
 
export const saveSession = (token, user) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    // injeta o header em todas as próximas requisições
    api.defaults.headers.common["Authorization"] = token;
  } catch (_) {}
};
 
export const loadSession = () => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const user  = JSON.parse(localStorage.getItem(USER_KEY) || "null");
    if (token && user) {
      api.defaults.headers.common["Authorization"] = token;
      return { token, user };
    }
  } catch (_) {}
  return null;
};
 
export const clearSession = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    delete api.defaults.headers.common["Authorization"];
  } catch (_) {}
};
 
// ─── Serviços de autenticação ─────────────────────────────────────────────────
 
export const AuthService = {
 
  login: async ({ email, senha }) => {
    const response = await api.post("/user/login", { email, senha });
    const { token, user } = response.data;
    saveSession(token, user);
    return { token, user };
  },
 
  register: async ({ nome, ano_nascimento, email, senha }) => {
    // a API espera o campo senha_hash (o backend faz o bcrypt internamente)
    await api.post("/user/", {
      nome,
      ano_nascimento: Number(ano_nascimento),
      email,
      senha_hash: senha,
      nivel_acesso: "padrao",
    });
  },
 
  logout: () => {
    clearSession();
  },
};