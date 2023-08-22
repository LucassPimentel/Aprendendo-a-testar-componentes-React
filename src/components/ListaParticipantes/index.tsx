import { useListarParticipantes } from "../../states/hooks/useListarParticipantes";

export default function ListaParticipantes() {
  const participantes: string[] = useListarParticipantes();
  return (
    <ul>
      {participantes.map((participante) => (
        <li key={participante}>{participante}</li>
      ))}
    </ul>
  );
}
