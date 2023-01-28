import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import moment from "moment/moment";
import './styles.css';

class MainTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lancamentos: [],
      show: false
    };

    this.handleAtualizar = this.handleAtualizar.bind(this);
    this.handleExcluir = this.handleExcluir.bind(this);
 

  }

  handleAtualizar(id){
    axios.get('hhtp://localhost:8080/lancamentos/${id}')
      .then(response => {
        this.setState({
          data: response.lancamentos.data,
          entrada: response.lancamentos.entrada,
          saida: response.lancamentos.saida,
          historico: response.lancamentos.historico,
          finalidade: response.lancamentos.finalidade,
          bancoCaixa: response.lancamentos.bancoCaixa,
          tipo: response.lancamentos.tipo,
          valor: response.lancamentos.valor,
          show: true

        })
      })
  }

  handleExcluir(id){
      if(window.confirm("Tem certeza que deseja excluir esse lancamento? ")){
          axios.delete(`http://localhost:8080/lancamentos/${id}`) 
          .then(response => {
            this.setState(prevState => {
              return {
                lancamento: prevState.lancamentos.filter(lancamento => lancamento.id !== id)
              }
            });
          })
          .catch(error => {
            alert("Erro ao excluir a transação");
            console.log(error);
          });
      }
      
    }

  componentDidMount() {
    axios
      .get("http://localhost:8080/lancamentos")
      .then(response => {
        this.setState({ lancamentos: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }


  render() {
    return (
      <Table className="MainTable"   hover >
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
              <td> <button onClick= {() => this.handleAtualizar(lancamentos.id)}> <i className="fas fa-edit"></i></button></td>
              <td> <button onClick= {() => this.handleExcluir(lancamentos.id)}> <i className="fas fa-trash"></i> </button></td>
            </tr> // o nome deve ser o mesmo que nos atributos do back-end
          ))}
        </tbody>
      </Table>
    );
  }
}

export default MainTable;
