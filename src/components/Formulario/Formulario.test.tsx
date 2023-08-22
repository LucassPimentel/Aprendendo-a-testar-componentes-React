import { act, fireEvent, render, screen } from "@testing-library/react";
import Formulario from ".";
import { RecoilRoot } from "recoil";

// lib Jest

// serve para deixar mais semântico e legível (agrupados)
describe("Testes unitários Formulário", () => {
  // 1º argumento é a descrição do teste (o que ele testará...), 2º implementação do teste
  test("quando o input estiver vazio, novos participantes não podem ser adicionados", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    // encontrar o input
    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );

    // encontrar o botão
    const botao = screen.getByRole("button");

    // garantir que o input esteja no doc
    expect(input).toBeInTheDocument();

    // garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled();
  });

  test("adicionar um participante caso exista um nome preenchido", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Teste Silva",
      },
    });

    fireEvent.click(botao);

    expect(input).toHaveFocus();
    expect(input).toHaveValue("");
  });

  test("nomes duplicados não devem ser adicionados na lista", () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Teste Silva",
      },
    });

    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: "Teste Silva",
      },
    });

    fireEvent.click(botao);

    const mensagemDeErro = screen.getByRole("alert");

    expect(mensagemDeErro.textContent).toBe(
      "Nomes duplicados não são permitidos."
    );
  });

  test("mensagem de erro deve sumir após tempo específico", () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      "Insira os nomes dos participantes"
    );
    const botao = screen.getByRole("button");

    fireEvent.change(input, {
      target: {
        value: "Teste Silva",
      },
    });

    fireEvent.click(botao);

    fireEvent.change(input, {
      target: {
        value: "Teste Silva",
      },
    });

    fireEvent.click(botao);

    let mensagemDeErro = screen.queryByRole("alert");

    expect(mensagemDeErro).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    mensagemDeErro = screen.queryByRole("alert");

    expect(mensagemDeErro).toBeNull();
  });
});
