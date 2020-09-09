import React from "react";
import styles from "./Table.module.css";

const Table = ({ pessoas }) => {
  const header = pessoas ? Object.keys(pessoas[0]) : null;

  async function deletarPessoa(id) {
    const response = await fetch(`http://localhost:8080/pessoas/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  async function handleClick(id) {
    await deletarPessoa(id);
  }

  if (!pessoas) return null;

  return (
    <table className={styles.students}>
      <tbody>
        <tr>
          {header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>;
          })}
          <th>DELETAR</th>
        </tr>
        {pessoas.map((pessoa) => {
          const { id, nome, email } = pessoa;
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{nome}</td>
              <td>{email}</td>
              <td>
                <button
                  onClick={() => {
                    handleClick(id);
                  }}
                >
                  deletar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
