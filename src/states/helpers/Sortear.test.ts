import { Sortear } from "./Sortear"

describe("Dado um sorteio de amigo secreto", () => {
    test("participantes não devem sortear o próprio nome", () => {
        const participantes = ["Pessoa 1", "Pessoa 2", "Pessoa 3", "Pessoa 4"]
        const sorteio = Sortear(participantes)

        participantes.forEach(participante => {    
            const amigoSecreto = sorteio.get(participante)
        
            expect(amigoSecreto).not.toEqual(participante)
        })
    })
})