import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import moment from "moment/moment";
import "./styles.css";
import { ApiCRUD } from "../../services/api/ApiCRUD";
import MainForm from "../MainForm/MainForm";
import { Link } from "react-router-dom";

function MainTable() {
  const [lancamentos, setLancamentos] = useState([]);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [dados, setDados] = useState(null);

  const handleAtualizar = async (id) => {
    const dadoRecuperado = await ApiCRUD.getByDisplayValue(id); 
    const dados = Object.entries(dadoRecuperado).map(([key, value])=> ({key, value}));
    setDados(dados)
    setFormIsOpen(true);
    console.log(dados);
    console.log(handleAtualizar);

  };

  const handleExcluir = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esse lancamento? ")) {
      ApiCRUD.delete(id).then(() => {
        setLancamentos(
          lancamentos.filter((lancamento) => lancamento.id !== id)
        );
      });
    }
  };

  useEffect(() => {
    ApiCRUD.getAll().then((response) => {
      setLancamentos(response);
    });
  }, []);

  return (
    <div>
      <Table className="MainTable" hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Data</th>
            <th>Entradas R$</th>
            <th> Saídas R$</th>
            <th>Histórico</th>
            <th>Finalidade</th>
            <th>Banco/Caixa</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lancamentos.map((lancamento, index) => (
            <tr key={lancamento.id}>
              <td>{index + 1}</td>
              <td>{moment(lancamento.data).format("DD/MM/YYYY")}</td>
              <td className="td_entrada">{lancamento.entrada}</td>
              <td className="td_saida">{lancamento.saida}</td>
              <td>{lancamento.historico}</td>
              <td>{lancamento.finalidade}</td>
              <td>{lancamento.bancoCaixa}</td>
              <td><button onClick={() => handleAtualizar(lancamento.id)}><i className="fas fa-edit"></i></button></td>
              <td>
                {" "}
                <button onClick={() => handleExcluir(lancamento.id)}>
                  {" "}
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
            {formIsOpen && <MainForm dados={dados} />}
          
        </tbody>
      </Table>
    </div>
  
  );
}

export default MainTable;
