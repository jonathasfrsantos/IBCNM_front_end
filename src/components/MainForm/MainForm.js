import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function MainForm({dataEdit}) {

const [formData, setFormData] = useState({
  id: (dataEdit && dataEdit.id) || "",
  data: (dataEdit && dataEdit.data) || "",
    entrada: (dataEdit && dataEdit.entrada) || "",
    saida: (dataEdit && dataEdit.saida) || "",
    historico: (dataEdit && dataEdit.historico) || "",
    finalidade: (dataEdit && dataEdit.finalidade) || "",
    bancoCaixa: (dataEdit && dataEdit.bancoCaixa) || "",
  });

const [isOpen, setIsOpen] = useState(false);

const closeModal = () => {
  setIsOpen(false);
};

const openModal = () => {
  setIsOpen(true);
};

const clearForm = () => {
  setFormData({
    data: "",
    valor: "",
    historico: "",
    finalidade: "",
    bancoCaixa: "",
  });
};

const handleChange = (e) => {
  setFormData({...formData, [e.target.name]: e.target.value});  // esse name é porque será usado o "name" do atributo dos inputs
}

return (
  <>
    <Form >
      <Form.Group className="form-group">
        <Form.Label className="label-style">Data</Form.Label>
        <Form.Control
          className="form-input"
          type="date"
          name="data" // o name do atributo do input é usado como uma chave para associar o valor do input com a propriedade correspondente no objeto 'formData'
          value={formData.data}
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
      <Button variant="primary" type="submit" >
        Salvar
      </Button>
    </Form>
  </>
);



};

export default MainForm;