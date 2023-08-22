import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import ListaParticipantes from ".";
import { useListarParticipantes } from "../../states/hooks/useListarParticipantes";

jest.mock("../../states/hooks/useListarParticipantes", () => {
  return {
    useListarParticipantes: jest.fn(),
  };
});

describe("Lista vazia de participantes", () => {
  beforeEach(() => {
    (useListarParticipantes as jest.Mock).mockReturnValue([]);
  });

  test("Verifica se a lista está vazia", () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    );

    const itens = screen.queryAllByRole("listitem");

    expect(itens).toHaveLength(0);
  });
});

describe("Lista preenchida de participantes", () => {
  const participantes = ["Teste Silva"];

  beforeEach(() => {
    (useListarParticipantes as jest.Mock).mockReturnValue(participantes);
  });

  test("Verifica se há itens na lista", () => {
    render(
      <RecoilRoot>
        <ListaParticipantes />
      </RecoilRoot>
    );

    const itens = screen.queryAllByRole("listitem");

    expect(itens).toHaveLength(participantes.length);
  });
});
