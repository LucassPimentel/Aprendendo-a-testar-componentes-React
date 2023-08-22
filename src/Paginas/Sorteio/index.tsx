import { useState } from "react";
import { useListarParticipantes } from "../../states/hooks/useListarParticipantes";
import { useResultadoSorteio } from "../../states/hooks/useResultadoSorteio";

export default function Sorteio() {
  const participantes = useListarParticipantes();
  const [participanteDaVez, setParticipanteDaVez] = useState("");
  const [amigoSecreto, setAmigoSecreto] = useState("");

  const resultadoSorteio = useResultadoSorteio();

  function sortear(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (resultadoSorteio.has(participanteDaVez)) {
      setAmigoSecreto(resultadoSorteio.get(participanteDaVez)!);

      setTimeout(() => {
        setAmigoSecreto("");
      }, 5000);
    }
  }

  return (
    <section>
      <form onSubmit={sortear}>
        <select
          required
          name="participante"
          id="participante"
          placeholder="Selecione o seu nome"
          value={participanteDaVez}
          onChange={(evento) => setParticipanteDaVez(evento.target.value)}
        >
          <option>Selecione seu nome</option>
          {participantes.map((participante) => (
            <option key={participante}>{participante}</option>
          ))}
        </select>
        <button>Sortear</button>
      </form>
      {amigoSecreto && <p role="alert">{amigoSecreto}</p>}
    </section>
  );
}
