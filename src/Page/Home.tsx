import { View, Text, TextInput, Image } from "react-native";
import styles from "../Styles/StyleHome";


export default function () {
  return (
    <View style={styles.container}>
      <View style={styles.navBarDiv}>
        <Image source={require("../../assets/Logo.png")} style={styles.image} />
        <TextInput
          placeholder="Buscar no Dicionário"
          style={[styles.searchInput, styles.border]}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.titleDiv}>
          <Text style={styles.title}>Buscar no dicionário</Text>
        </View>
        <View style={styles.Terms_MainDiv}>
          <View style={[styles.TermsDiv, styles.border]}>
            <Text style={styles.title}>Palavra</Text>
            <Text style={styles.subtitle}>Tradução</Text>
            <Text style={styles.description}>Descrição bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla [...]</Text>
            <View style={styles.moreDiv}>
              <Text style={styles.more}>Ver mais</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
