import shuffle from "just-shuffle"

export function Sortear(participantes: string[]){
    const totalParticipantes = participantes.length
    const embaralhado = shuffle(participantes)
    const resultadoAmigoSecreto = new Map<string, string>()

    for (let index = 0; index < totalParticipantes; index++) {
        const proximoIndice = index === (totalParticipantes - 1) ? 0 : index++
        resultadoAmigoSecreto.set(embaralhado[index], embaralhado[proximoIndice])
    }

    return resultadoAmigoSecreto

}