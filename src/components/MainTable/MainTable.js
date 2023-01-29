import React, { Component } from "react";
import { Table } from "react-bootstrap";
import moment from "moment/moment";
import "./styles.css";
import { ApiCRUD } from "../../services/api/ApiCRUD";
import MainForm2 from "../MainForm/MainForm2";

class MainTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lancamentos: [],
      show: false,
      formIsOpen: false
    };

    this.handleExcluir = this.handleExcluir.bind(this);
  }

  handleAtualizar = async (id) => {
    const dados = await ApiCRUD.getByDisplayValue(id);
    this.setState((prevState) => {
      const lancamentos = prevState.lancamentos.map((lancamento) => {
        if (lancamento.id === id) {
          return {
            ...lancamento,
            data: dados.data,
            entrada: dados.entrada,
            saida: dados.saida,
            historico: dados.historico,
            finalidade: dados.finalidade,
            bancoCaixa: dados.bancoCaixa,
          };
        }
        return lancamento;
      });

      return {
        lancamentos,
        formIsOpen: true,
      };
    });
  };

  handleExcluir(id) {
    if (window.confirm("Tem certeza que deseja excluir esse lancamento? ")) {
      ApiCRUD.delete(id).then(() => {
        this.setState((prevState) => {
          return {
            lancamento: prevState.lancamentos.filter(
              (lancamento) => lancamento.id !== id
            ),
          };
        });
      });
    }
  }

  componentDidMount() {
    ApiCRUD.getAll().then((response) => {
      this.setState({ lancamentos: response });
    });
  }

  render() {
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
            {this.state.lancamentos.map((lancamentos, index) => (
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
                  <button onClick={() => this.handleAtualizar(lancamentos.id)}>
                    {" "}
                    <i className="fas fa-edit"></i>
                  </button>
                </td>
                <td>
                  {" "}
                  <button onClick={() => this.handleExcluir(lancamentos.id)}>
                    {" "}
                    <i className="fas fa-trash"></i>{" "}
                  </button>
                </td>
              </tr> // o nome deve ser o mesmo que nos atributos do back-end
            ))}
          </tbody>
        </Table>
       
      </div>
    );
  }
}

export default MainTable;
