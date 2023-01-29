import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ApiCRUD } from "../../services/api/ApiCRUD";
import "./styles.css";

function MainForm(props) {
  const [state, setState] = useState({
    id: 0,
    data: "",
    entrada: "",
    saida: "",
    historico: "",
    finalidade: "",
    bancoCaixa: "",
    tipo: "",
    valor: "",
    modalOpen: false,
    itemId: null,
  });

  useEffect(() => {
    if(props.dados){
    setState({
      id: props.dados.id,
      data: props.dados.data,
      entrada: props.dados.entrada,
      saida: props.dados.saida,
      historico: props.dados.historico,
      finalidade: props.dados.finalidade,
      bancoCaixa: props.dados.bancoCaixa,
    });
    }
  }, [props.dados])

  const {tipo} = (props);

  const handleOpenModal = () => {
    setState({ ...state, modalOpen: true });
  };

  const handleClose = () => {
    setState({ ...state, showModal: false });
    clearForm();
  };

  const clearForm = () => {
    setState({
      data: "",
      valor: "",
      historico: "",
      finalidade: "",
      bancoCaixa: "",
    });
  };

  const handleTipoChange = (e) => {
    setState({ ...state, tipo: e.target.value });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleFormaDaTransacao = (e) => {
    setState({ ...state, bancoCaixa: e.target.value });
  };

  const getColor = () => {
    if (tipo === "entrada") {
      return { color: "green" };
    } else if (tipo === "saida") {
      return { color: "red" };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, data, historico, finalidade, bancoCaixa, valor, tipo } = state;

    let dados = { id, data, historico, finalidade, bancoCaixa, tipo };

    if (tipo === "entrada") {
      dados.entrada = valor;
      dados.saida = null;
    } else if (tipo === "saida") {
      dados.saida = valor;
      dados.entrada = null;
    }

    ApiCRUD.saveOrUpdate(id, dados);
        clearForm();
 

  };

  return (
    <>
      <Modal
        isOpen={handleOpenModal}
        onClose={handleClose}
        show={props.showModal}
        onHide={props.handleClose}
        title={props.title}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            <h1> Escolha entre entrada ou saída</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="radio-container">
              <Form.Check
                className="form-check"
                type="radio"
                label="Entradas R$"
                value="entrada"
                checked={state.tipo === "entrada"}
                onChange={handleTipoChange}
                id="entrada"
              />
              <Form.Check
                className="form-check"
                type="radio"
                label="Saídas R$"
                value="saida"
                checked={state.tipo === "saida"}
                onChange={handleTipoChange}
                id="saida"
              />
            </div>
            <Form.Group className="form-group" controlId="formDataContabil">
              <Form.Label className="label-style">Data</Form.Label>
              <Form.Control
                className="form-input"
                type="date"
                placeholder="Data contábil"
                value={state.data}
                onChange={handleChange}
                id="data"
              />
            </Form.Group>

            <Form>
              <Form.Group className="form-group" controlId="formValor">
                <Form.Label className="label-style" style={getColor()}>
                  {" "}
                  Valor R${" "}
                </Form.Label>
                <Form.Control
                  className="form-input"
                  type="number"
                  placeholder="0.00"
                  value={state.valor}
                  onChange={handleChange}
                  id="valor"
                />
              </Form.Group>
            </Form>

            <Form.Group className="form-group" controlId="formHistorico">
              <Form.Label className="label-style">Histórico</Form.Label>
              <Form.Control
                className="form-input"
                type="text"
                placeholder=""
                value={state.historico}
                onChange={handleChange}
                id="historico"
              />
            </Form.Group>

            <Form.Group className="form-group" controlId="formFinalidade">
              <Form.Label className="label-style">Finalidade</Form.Label>
              <Form.Control
                className="form-input"
                type="text"
                placeholder=""
                value={state.finalidade}
                onChange={handleChange}
                id="finalidade"
              />
            </Form.Group>

            <Form.Group className="form-group" controlId="formBancoCaixa">
              <Form.Label className="label-style">Banco/Caixa</Form.Label>
              <Form.Control
                as="select"
                className="form-input"
                value={state.bancoCaixa}
                onChange={handleFormaDaTransacao}
                id="bancoCaixa"
              >
                <option> Selecione</option>
                <option>CAIXA</option>
                <option>ITAÚ</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Salvar
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MainForm;
