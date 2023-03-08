import React, { useState } from "react";
import { Table, Button, Modal} from "react-bootstrap";

import MainForm from "../MainForm/MainForm";
import moment from "moment/moment";

import './styles.css';

function MainTable({tbDataToForm}) {     //tbDataToForm é uma props que será usada para enviar os dados para o formulário na hora de editar

const [dataTable, setDataTable] = useState([]);

const [show, setShow] = useState(false);    //controle o estado "aberto/fechado" do formulário 

const handleClose = () => setShow(false);

return (
  <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Data</th>
          <th>Entrada</th>
          <th>Saída</th>
          <th>Histórico</th>
          <th>Finalidade</th>
          <th>Banco/Caixa</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {dataTable.map((data, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{moment(data.data).format("DD/MM/YYYY")}</td>
            <td>{data.entrada}</td>
            <td>{data.saida}</td>
            <td>{data.historico}</td>
            <td>{data.finalidade}</td>
            <td>{data.bancoCaixa}</td>
            <td><Button><i className="fas fa-edit"></i></Button></td>
            <td><Button><i className="fas fa-trash"></i> </Button> </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Dados</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MainForm
          close={handleClose}
        />
      </Modal.Body>
    </Modal>
  </>
);
}

export default MainTable;



