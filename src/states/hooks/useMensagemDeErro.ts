import { erroState } from "../atom"
import {useRecoilValue} from 'recoil'

export const useMensagemDeErro =  () => {
    const mensagemDeErro = useRecoilValue(erroState)
    return mensagemDeErro;
}