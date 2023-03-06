import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import Axios from "axios";
import MainForm from "../MainForm/MainForm";
import moment from "moment/moment";
import { ApiCRUD } from "../../services/api/ApiCRUD";
import './styles.css';

function MainTable({data, onSubmit}) {
  const [dataEdit, setDataEdit] = useState([]); // A escolha de inicializar o state com uma lista vazia é uma prática comum quando se está aguardando uma resposta de uma API externa. Assim, evita-se erros de renderização, já que a lista é atualizada assim que os dados são carregados. Além disso, usando uma lista vazia no início permite que você defina uma lógica para lidar com o caso em que a lista ainda está vazia ou se há erros ao carregar os dados da API.
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

  const [tableData, setTableData] = useState(data);

  const handleClose = () => setShow(false);
  const handleShow = (data) => {          //esse data é do escopo local
    setSelectedData(data);               // data do escopo local
    setShow(true); 
  };

  useEffect(() => {
    setTableData(data);
  }, [data]);

    useEffect(() => {
    Axios.get("http://localhost:8080/lancamentos")
      .then(response => {
        setDataEdit(response.data);        //esse data é do próprio response
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

 const  handleDelete = (id) => {
    if(window.confirm("Tem certeza que deseja excluir esse lançamento? "))
        ApiCRUD.delete(id)
          .then((response) => {
            setDataEdit(prevState => {
              return {
                data: prevState.filter(data => data.id !== id)
              }
            })
            window.location.reload();
          })
  }

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
          {dataEdit.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{moment(data.data).format("DD/MM/YYYY")}</td>
              <td>{data.entrada}</td>
              <td>{data.saida}</td>
              <td>{data.historico}</td>
              <td>{data.finalidade}</td>
              <td>{data.bancoCaixa}</td>
              <td><Button onClick={() => handleShow(data)}><i className="fas fa-edit"></i></Button></td>
              <td><Button onClick={() => handleDelete(data.id)}><i className="fas fa-trash"></i> </Button> </td>
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
            onSubmit={onSubmit}
            data={data}
            dataEdit={selectedData}
            close={handleClose}
            updateData={setDataEdit}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MainTable;