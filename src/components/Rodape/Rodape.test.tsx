import { fireEvent, render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Rodape from ".";
import { useListarParticipantes } from "../../states/hooks/useListarParticipantes";

jest.mock("../../states/hooks/useListarParticipantes", () => {
  return {
    useListarParticipantes: jest.fn(),
  };
});

const mockUseNavigate = jest.fn();
const mockUseSorteador = jest.fn();

jest.mock("../../states/hooks/useSorteador", () => {
  return {
    useSorteador: () => mockUseSorteador,
  };
});

jest.mock("react-router-dom", () => {
  return {
    useNavigate: () => mockUseNavigate,
  };
});

describe("QUando não existem participantes suficientes", () => {
  beforeEach(() => {
    (useListarParticipantes as jest.Mock).mockReturnValue([]);
  });

  test("Sorteio não pode ser iniciado", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole("button");

    expect(botao).toBeDisabled();
  });
});

describe("Quando existem participantes suficientes", () => {
  beforeEach(() => {
    (useListarParticipantes as jest.Mock).mockReturnValue([
      "Pessoa 1",
      "Pessoa 2",
      "Pessoa 3",
    ]);
  });

  test("Sorteador pode ser iniciado", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole("button");

    expect(botao).not.toBeDisabled();
  });

  test("Sorteador iniciado", () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole("button");
    fireEvent.click(botao);

    expect(mockUseNavigate).toHaveBeenCalled();
    expect(mockUseNavigate).toHaveBeenCalledWith("/sorteio");
    expect(mockUseSorteador).toHaveBeenCalled();
  });
});
