import { useListarParticipantes } from "./useListarParticipantes"
import {  useSetRecoilState } from "recoil"
import { resultadoAmigoSecreto } from "../atom"
import { Sortear } from "../helpers/Sortear"

export const useSorteador = () => {

    const participantes = useListarParticipantes()
    const setResultadoAmigoSecreto = useSetRecoilState(resultadoAmigoSecreto)
    return () => {

        const resultadoAmigoSecreto = Sortear(participantes)
        setResultadoAmigoSecreto(resultadoAmigoSecreto)
    }
}