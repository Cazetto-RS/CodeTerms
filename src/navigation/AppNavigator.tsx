import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Navbar from "../components/NavBar";
import Home from "../Page/Home";
import About from "../Page/About";
import Profile from "../Page/Profile";
import Login from "../Page/Login";
import Cadastro from "../Page/Cadastro";

type Page = "Home" | "Sobre" | "Perfil" | "Login" | "Cadastro";

export default function AppNavigator() {
  const [paginaAtiva, setPaginaAtiva] = useState<Page>("Home");

  const renderPagina = () => {
    switch (paginaAtiva) {
      case "Home":   return <Home />;
      case "Sobre":  return <About />;
      case "Perfil": return <Profile onNavegar={setPaginaAtiva}/>;
      case "Login":  return <Login onNavegar={setPaginaAtiva}/>;
      case "Cadastro": return <Cadastro onNavegar={setPaginaAtiva}/>;
    }
  };

  return (
    <View style={styles.container}>
      {/* Navbar fixa no topo — presente em todas as páginas */}
      <Navbar paginaAtiva={paginaAtiva} onNavegar={setPaginaAtiva} />

      {/* Conteúdo da página ativa */}
      <View style={styles.pagina}>
        {renderPagina()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  pagina: {
    flex: 1,
  },
});
