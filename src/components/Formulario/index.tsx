import { useRef, useState } from "react";
import { useAdicionarParticipante } from "../../states/hooks/useAdicionarParticipante";
import { useMensagemDeErro } from "../../states/hooks/useMensagemDeErro";

export default function Formulario() {
  const [nome, setNome] = useState("");
  const adicionarNaLista = useAdicionarParticipante();
  const inputRef = useRef<HTMLInputElement>(null);

  const mensagemDeErro = useMensagemDeErro();

  function adicionarParticipante(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    adicionarNaLista(nome);
    setNome("");
    inputRef.current?.focus();
  }

  return (
    <form onSubmit={adicionarParticipante}>
      <input
        onChange={(evento) => setNome(evento.target.value)}
        value={nome}
        ref={inputRef}
        type="text"
        placeholder="Insira os nomes dos participantes"
      />
      <button disabled={!nome}>Adicionar</button>
      {mensagemDeErro && <p role="alert">{mensagemDeErro}</p>}
    </form>
  );
}
