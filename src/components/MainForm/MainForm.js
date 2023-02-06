import moment from "moment";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ApiCRUD } from "../../services/api/ApiCRUD";
import "./styles.css";

function MainForm({ data, close, updateData }) {
  const [formData, setFormData] = useState({
    id: (data && data.id) || "",
    data: (data && data.data) || "",
    entrada: (data && data.entrada) || "",
    saida: (data && data.saida) || "",
    historico: (data && data.historico) || "",
    finalidade: (data && data.finalidade) || "",
    bancoCaixa: (data && data.bancoCaixa) || "",
  });

  const [operationType, setOperationType] = useState("");

  const handleOperationType = (e) => {
    setOperationType({ ...setOperationType, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    ApiCRUD.update(data.id, formData).then((response) => {
      updateData((prevData) =>
        prevData.map((data) => (data.id === formData.id ? formData : data))
      );
      close();
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // esse name é porque será usado o "name" do atributo dos inputs
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group">
          <Form.Label className="label-style">Data</Form.Label>
          <Form.Control
            className="form-input"
            type="date"
            name="data" // o name do atributo do input é usado como uma chave para associar o valor do input com a propriedade correspondente no objeto 'formData'
            value={moment(formData.data).format("DD/MM/YYYY")}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="label-style">Valor R$</Form.Label>
          <Form.Control
            className="form-input"
            type="number"
            name="entrada"
            value={formData.entrada}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label className="label-style">Histórico</Form.Label>
          <Form.Control
            className="form-input"
            type="text"
            name="historico"
            value={formData.historico}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label className="label-style">Finalidade</Form.Label>
          <Form.Control
            className="form-input"
            type="text"
            name="finalidade"
            value={formData.finalidade}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="form-group">
          <Form.Label className="label-style">Banco/Caixa</Form.Label>
          <Form.Control
            className="form-input"
            type="text"
            name="bancoCaixa"
            value={formData.bancoCaixa}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Salvar
        </Button>
      </Form>
    </>
  );
}

export default MainForm;
