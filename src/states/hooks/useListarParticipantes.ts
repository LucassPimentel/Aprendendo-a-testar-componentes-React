import { useRecoilValue } from "recoil"
import { listaParticipantesState } from "../atom"

export const useListarParticipantes = () => {
    return useRecoilValue(listaParticipantesState)
}