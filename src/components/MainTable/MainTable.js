import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import moment from "moment/moment";
import './styles.css';

class MainTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
 

  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/lancamentos/orderByData")
      .then(response => {
        this.setState({ transactions: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }


  render() {
    return (
      <Table className="MainTable" striped  hover bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>Data</th>
            <th>Entradas R$</th>
            <th> Saídas R$</th>
            <th>Histórico</th>
            <th>Finalidade</th>
            <th>Banco/Caixa</th>
          </tr>
        </thead>
        <tbody>
          {this.state.transactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <td>{index + 1}</td>
              <td>{moment(transaction.data).format("DD/MM/YYYY")}</td>
              <td >{transaction.entrada}</td>
              <td >{transaction.saida}</td>
              <td>{transaction.historico}</td>
              <td>{transaction.finalidade}</td>
              <td>{transaction.banco_caixa}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default MainTable;