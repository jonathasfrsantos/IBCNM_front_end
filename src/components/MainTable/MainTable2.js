import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import moment from "moment/moment";
import "./styles.css";
import { ApiCRUD } from "../../services/api/ApiCRUD";
import MainForm2 from "../MainForm/MainForm2";

function MainTable2() {
  const [lancamentos, setLancamentos] = useState([]);
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [dados, setDados] = useState(null);

  const handleAtualizar = async (id) => {
    const dados = await ApiCRUD.getByDisplayValue(id);
    setDados(dados);
    setFormIsOpen(true);
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
          {lancamentos.map((lancamentos, index) => (
            <tr key={lancamentos.id}>
              <td>{index + 1}</td>
              <td>{moment(lancamentos.data).format("DD/MM/YYYY")}</td>
              <td className="td_entrada">{lancamentos.entrada}</td>
              <td className="td_saida">{lancamentos.saida}</td>
              <td>{lancamentos.historico}</td>
              <td>{lancamentos.finalidade}</td>
              <td>{lancamentos.bancoCaixa}</td>
              <td>
                {" "}
                <button onClick={() => handleAtualizar(lancamentos.id)}>
                  {" "}
                  <i className="fas fa-edit"></i>
                </button>
              </td>
              <td>
                {" "}
                <button onClick={() => handleExcluir(lancamentos.id)}>
                  {" "}
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {formIsOpen && <MainForm2  data={dados} />}
    </div>
  );
}

export default MainTable2;