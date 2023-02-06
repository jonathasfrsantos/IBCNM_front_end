import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import Axios from "axios";
import MainForm from "../MainForm/MainForm";
import moment from "moment/moment";

function MainTable() {
  const [data, setData] = useState([]); // A escolha de inicializar o state com uma lista vazia é uma prática comum quando se está aguardando uma resposta de uma API externa. Assim, evita-se erros de renderização, já que a lista é atualizada assim que os dados são carregados. Além disso, usando uma lista vazia no início permite que você defina uma lógica para lidar com o caso em que a lista ainda está vazia ou se há erros ao carregar os dados da API.
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState({
    id: "",
    data: "",
    entrada: "",
    saida: "",
    historico: "",
    finalidade: "",
    bancoCaixa: ""
  });

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    setSelectedData(data);
    setShow(true);
  };

    useEffect(() => {
    Axios.get("http://localhost:8080/lancamentos")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{moment(data.data).format("DD/MM/YYYY")}</td>
              <td>{data.entrada}</td>
              <td>{data.saida}</td>
              <td>{data.historico}</td>
              <td>{data.finalidade}</td>
              <td>{data.bancoCaixa}</td>
              <td>
                <Button onClick={() => handleShow(data)}>Editar</Button>
              </td>
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
            data={selectedData}
            close={handleClose}
            updateData={setData}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MainTable;