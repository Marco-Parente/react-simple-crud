import React, { useState, useEffect, useCallback } from "react";
import Table from "./Components/Table";
import Input from "./Components/Input";

function App() {
  const [pessoas, setPessoas] = useState([]);
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const getPessoas = useCallback(async () => {
    const response = await fetch("http://localhost:8080/pessoas");
    const json = await response.json();
    setPessoas(json);
  }, []);

  async function salvarPessoa() {
    const response = await fetch("http://localhost:8080/pessoas", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email }),
    });

    const json = await response.json();
    console.log(json);
  }

  async function atualizarPessoa() {
    const response = await fetch(`http://localhost:8080/pessoas/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email }),
    });
  }

  useEffect(() => {
    getPessoas();
  }, [getPessoas]);

  useEffect(() => {
    console.log(pessoas);
  }, [pessoas]);

  async function handleCreateSubmit(event) {
    event.preventDefault();

    await salvarPessoa();

    setNome("");
    setEmail("");
  }

  async function handleUpdateSubmit(event) {
    event.preventDefault();

    await atualizarPessoa();

    setNome("");
    setEmail("");
  }

  return (
    <>
      {pessoas !== null && pessoas.length > 0 && <Table pessoas={pessoas} />}
      <form onSubmit={handleCreateSubmit}>
        <h1>Enviar novo cadastro</h1>
        <Input
          label="Nome"
          value={nome}
          onChange={({ target }) => setNome(target.value)}
          name="Nome"
          type="text"
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          name="Email"
        />
        <button>Enviar</button>
      </form>

      <form onSubmit={handleUpdateSubmit}>
        <h1>Atualizar cadastro</h1>
        <Input
          label="ID"
          value={id}
          onChange={({ target }) => setId(target.value)}
          name="Id"
          type="text"
        />
        <Input
          label="Nome"
          value={nome}
          onChange={({ target }) => setNome(target.value)}
          name="Nome"
          type="text"
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          name="Email"
        />
        <button>Enviar</button>
      </form>
    </>
  );
}

export default App;
