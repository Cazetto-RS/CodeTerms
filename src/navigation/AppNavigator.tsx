import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { loadSession } from "../server/authService";
import Navbar from "../components/NavBar";
import Home from "../Page/Home";
import About from "../Page/About";
import Profile from "../Page/Profile";
import Login from "../Page/Login";
import Cadastro from "../Page/Cadastro";
import NovoTermo from "../Page/NovoTermo";
import AlterarSenha from "../Page/AlterarSenha";
import RecomendarTermo from "../Page/RecomendarTermo";
import Recomendacoes from "../Page/Recomendacoes";

export type Page = "Home" | "Sobre" | "Perfil" | "Login" | "Cadastro" | "NovoTermo" | "AlterarSenha" | "RecomendarTermo" | "Recomendacoes";

export default function AppNavigator() {
  const [paginaAtiva, setPaginaAtiva] = useState<Page>("Home");
  const [usuario, setUsuario] = useState<any>(null);
  const [params,  setParams]  = useState<any>(null);

  // Restaura sessão ao abrir o app
  useEffect(() => {
    const sessao = loadSession();
    if (sessao) setUsuario(sessao.user);
  }, []);

  // Navegação — Login passa o usuário ao navegar para Perfil
  const navegar = (pagina: Page, userOrParams?: any) => {
    // Se vier do login, traz { id, nome, email, ... } com campo nivel_acesso.
    // Parâmetros de navegação são limpos quando não houver payload para evitar
    // que uma recomendação antiga preencha um novo termo aberto pelo menu.
    if (userOrParams?.nivel_acesso !== undefined) {
      setUsuario(userOrParams);
      setParams(null);
    } else {
      setParams(userOrParams ?? null);
    }
    setPaginaAtiva(pagina);
  };

  const renderPagina = () => {
    switch (paginaAtiva) {
      case "Home": return <Home usuario={usuario} />;
      case "Sobre":     return <About />;
      case "Perfil":    return <Profile onNavegar={navegar} usuario={usuario} />;
      case "Login":     return <Login onNavegar={navegar} />;
      case "Cadastro":  return <Cadastro onNavegar={navegar} />;
      case "NovoTermo":      return <NovoTermo onNavegar={navegar} params={params} />;
      case "AlterarSenha": return <AlterarSenha onNavegar={navegar} usuario={usuario} />;
      case "RecomendarTermo": return <RecomendarTermo onNavegar={navegar} usuario={usuario} />;
      case "Recomendacoes":    return <Recomendacoes onNavegar={navegar} />;
    } 
  };

  return (
    <View style={styles.container}>
      <Navbar paginaAtiva={paginaAtiva} onNavegar={navegar} usuario={usuario} />
      <View style={styles.pagina}>
        {renderPagina()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  pagina:    { flex: 1 },
});
