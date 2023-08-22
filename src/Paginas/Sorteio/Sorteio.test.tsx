import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import { useListarParticipantes } from "../../states/hooks/useListarParticipantes";
import Sorteio from ".";
import { useResultadoSorteio } from "../../states/hooks/useResultadoSorteio";
import { act } from "react-dom/test-utils";

jest.mock("../../states/hooks/useListarParticipantes", () => {
  return {
    useListarParticipantes: jest.fn(),
  };
});

jest.mock("../../states/hooks/useResultadoSorteio", () => {
  return {
    useResultadoSorteio: jest.fn(),
  };
});

describe("Na página de sorteio", () => {
  const participantes = ["Pessoa 1", "Pessoa 2", "Pessoa 3"];
  const resultadoSorteio = new Map([["Pessoa 1", "Pessoa 2"]]);

  beforeEach(() => {
    (useListarParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoSorteio as jest.Mock).mockReturnValue(resultadoSorteio);
  });

  test("Todos os participantes podem exibir o seu amigo secreto", () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const opcoes = screen.queryAllByRole("option");

    expect(opcoes).toHaveLength(participantes.length + 1);
  });

  test("O amigo secreto é exibido quando solicitado", () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const select = screen.getByPlaceholderText("Selecione o seu nome");

    fireEvent.change(select, {
      target: {
        value: participantes[0],
      },
    });

    const botao = screen.getByRole("button");
    fireEvent.click(botao);

    const amigoSecreto = screen.getByRole("alert");

    expect(amigoSecreto).toBeInTheDocument();
  });

  test("O nome do amigo secreto deve ser exibido por apenas 5 segundos", () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const select = screen.getByPlaceholderText("Selecione o seu nome");

    fireEvent.change(select, {
      target: {
        value: participantes[0],
      },
    });

    act(() => {
      jest.runAllTimers();
    });

    // Diferença do queryBy.. e do getBy é que o queryBy vai retornar o que foi encontrado ou null se nada foi encontrado,
    // já o getBy se não for encontrado ele retorna um erro.
    const amigoSecreto = screen.queryByRole("alert");

    expect(amigoSecreto).not.toBeInTheDocument();
  });
});
