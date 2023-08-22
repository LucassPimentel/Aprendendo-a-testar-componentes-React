import { useSetRecoilState, useRecoilValue } from "recoil"
import { erroState, listaParticipantesState } from "../atom"

export const useAdicionarParticipante = () => {
    const setListaParticipantes = useSetRecoilState(listaParticipantesState)
    const listaParticipantes = useRecoilValue(listaParticipantesState)
    const setErro = useSetRecoilState(erroState)

    return (nomeParticipante: string) => {
        if (listaParticipantes.includes(nomeParticipante)) {
            setErro("Nomes duplicados não são permitidos.")
            setTimeout(() => {
                setErro("")
            }, 3000)
            return
        }

        return setListaParticipantes(participantes => [...participantes, nomeParticipante])
    }
}