import { useNavigate } from "react-router-dom";
import { useListarParticipantes } from "../../states/hooks/useListarParticipantes";
import { useSorteador } from "../../states/hooks/useSorteador";

export default function Rodape() {
  const participantes = useListarParticipantes();

  const navegarPara = useNavigate();

  const sortear = useSorteador();

  function Iniciar() {
    navegarPara("/sorteio");
    sortear();
  }

  return (
    <footer>
      <button onClick={Iniciar} disabled={participantes.length < 3}>
        Iniciar Brincadeira
      </button>
    </footer>
  );
}
