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

export type Page = "Home" | "Sobre" | "Perfil" | "Login" | "Cadastro" | "NovoTermo";

export default function AppNavigator() {
  const [paginaAtiva, setPaginaAtiva] = useState<Page>("Home");
  const [usuario, setUsuario] = useState<any>(null);

  // Restaura sessão ao abrir o app
  useEffect(() => {
    const sessao = loadSession();
    if (sessao) setUsuario(sessao.user);
  }, []);

  // Navegação — Login passa o usuário ao navegar para Perfil
  const navegar = (pagina: Page, user?: any) => {
    if (user) setUsuario(user);
    setPaginaAtiva(pagina);
  };

  const renderPagina = () => {
    switch (paginaAtiva) {
      case "Home": return <Home usuario={usuario} />;
      case "Sobre":     return <About />;
      case "Perfil":    return <Profile onNavegar={navegar} usuario={usuario} />;
      case "Login":     return <Login onNavegar={navegar} />;
      case "Cadastro":  return <Cadastro onNavegar={navegar} />;
      case "NovoTermo": return <NovoTermo onNavegar={navegar} />;
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
