import React, { useState, useEffect } from "react";
import {
    View, Text, TextInput, TouchableOpacity,
    ScrollView, useWindowDimensions, ActivityIndicator,
} from "react-native";
import { getStyles } from "../Styles/styleAuth";
import { AuthService } from "../server/authService";
import { RecomendacoesService } from "../server/recomendacoesService";


export default function RecomendarTermo({
    onNavegar,
    usuario,
}: {
    onNavegar: (pagina: any) => void;
    usuario: any;
}) {
    useEffect(() => {
        if (typeof document !== "undefined") {
            document.title = "Recomendar | CodeTerms"
        }

        return () => {
            document.title = "CodeTerms"
        }
    })

    const { width } = useWindowDimensions();
    const s = getStyles(width);

    const [termoEn, setTermoEn] = useState("");
    const [termoPt, setTermoPt] = useState("");
    const [significado, setSignificado] = useState("");
    const [motivo, setMotivo] = useState("");
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState(false);

    const handleEnviar = async () => {
        setErro("");
        if (!termoEn || !termoPt || !significado || !motivo) {
            setErro("Preencha todos os campos."); return;
        }
        setLoading(true);
        try {
            await RecomendacoesService.create({
                termo_en: termoEn,
                termo_pt: termoPt,
                significado,
                motivo_contexto: motivo,
            });
            setSucesso(true);
        } catch (e: any) {
            const msg = e?.response?.data?.error ?? e?.message ?? "Erro ao enviar recomendação.";
            setErro(String(msg));
        } finally {
            setLoading(false);
        }
    };

    if (sucesso) {
        return (
            <ScrollView style={s.scroll} contentContainerStyle={s.center}>
                <View style={s.card}>
                    <View style={[s.cardIcon, { backgroundColor: "#EDFAF3" }]}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="#2E7D57" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </View>
                    <Text style={s.cardTitle}>Termo recomendado!</Text>
                    <Text style={s.cardSubtitle}>
                        O termo foi recomendado e será analisado pela administração.
                    </Text>
                    <TouchableOpacity style={s.btn} onPress={() => onNavegar("Perfil")}>
                        <Text style={s.btnText}>Voltar ao perfil</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }

    return (
        <ScrollView style={s.scroll} contentContainerStyle={s.center}>
            <View style={s.cardRecomendação}>

                <Text style={s.cardTitle}>Recomendar Termo</Text>
                <Text style={s.cardSubtitle}>
                    Informe os detalhes do termo que deseja recomendar.
                </Text>

                {!!erro && (
                    <View style={{ backgroundColor: "#FEF3F3", borderRadius: 8, padding: 12, marginBottom: 16 }}>
                        <Text style={{ fontSize: 13, color: "#C0514A" }}>{erro}</Text>
                    </View>
                )}

                <View style={s.AlignRow}>
                    {/* Termo em inglês */}
                    <View style={s.fieldGroup}>
                        <Text style={s.label}>Termo em inglês</Text>
                        <View style={{ position: "relative" }}>
                            <TextInput
                                style={[s.inputRecomendarTermo]}
                                placeholder="Insira o termo em inglês" placeholderTextColor="#9CA3AF"
                                value={termoEn} onChangeText={setTermoEn}
                            />
                        </View>
                    </View>

                    {/* Termo em português */}
                    <View style={s.fieldGroup}>
                        <Text style={s.label}>Termo em português</Text>
                        <View style={{ position: "relative" }}>
                            <TextInput
                                style={[s.inputRecomendarTermo]}
                                placeholder="Insira o termo em português" placeholderTextColor="#9CA3AF"
                                value={termoPt} onChangeText={setTermoPt}
                            />
                        </View>
                    </View>
                </View>

                {/* Significado do termo */}
                <View style={s.fieldGroup}>
                    <Text style={s.label}>Significado do termo</Text>
                    <View style={{ position: "relative" }}>
                        <TextInput
                            style={[
                                s.input, { paddingRight: 44 }]}
                            placeholder="Insira o significado do termo" placeholderTextColor="#9CA3AF"
                            value={significado} onChangeText={setSignificado}
                        />
                    </View>
                </View>

                {/* Confirmar nova senha */}
                <View style={s.fieldGroup}>
                    <Text style={s.label}>Motivo</Text>
                    <View style={{ position: "relative" }}>
                        <TextInput
                            style={[
                                s.input, { paddingRight: 44 },

                            ]}
                            placeholder="Explique o motivo da recomendação" placeholderTextColor="#9CA3AF"
                            value={motivo} onChangeText={setMotivo}
                        />
                    </View>
                </View>

                <TouchableOpacity style={s.btn} onPress={handleEnviar} disabled={loading}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Enviar recomendação</Text>}
                </TouchableOpacity>

                <View style={s.footerRow}>
                    <TouchableOpacity onPress={() => onNavegar("Perfil")}>
                        <Text style={s.footerLink}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ height: 30, width: 20 }}></View>
        </ScrollView>
    );
}
