import axios from "axios";
import React, { Component } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import "./styles.css";

class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      data: "",
      entrada: "",
      saida: "",
      historico: "",
      finalidade: "",
      bancoCaixa: "",
      tipo: "", // atributo não pertecente a classe "lançamentos",
      valor:""

   
      
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.updateTable = this.updateTable.bind(this);
    this.handleTipoChange = this.handleTipoChange.bind(this);
    this.handleValorChange = this.handleValorChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormaDaTransacao = this.handleFormaDaTransacao.bind(this);  
  }

  clearForm() {
    this.setState({
      data: "",
      valor: "",
      historico: "",
      finalidade: "",
      bancoCaixa: "",
    });
  }

  updateTable() {
    axios
      .get("http://localhost:8080/lancamentos")
      .then((response) => {
        this.setState({
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClose() {
    this.setState({ showModal: false });
    this.clearForm();
  }

  handleShow(modalTitle, tipo) {
    this.setState({ showModal: true, modalTitle, tipo });
  }

  handleChange(e){
    this.setState({[e.target.id]: e.target.value});
  }

  handleTipoChange(e){
    this.setState({tipo: e.target.value})
  }

  handleValorChange(e){
    this.setState({valor: e.target.value})
  }

  handleFormaDaTransacao(e){
    this.setState({bancoCaixa: e.target.value})
  }




  getColor(){
    if(this.state.tipo === 'entrada'){
      return {color: "green"}
    } else if (this.state.tipo === 'saida'){
      return {color : "red"}
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const {  data, historico, finalidade, bancoCaixa, tipo, valor } =
      this.state;

      let dados = {data, historico, finalidade, bancoCaixa};

      if(this.state.tipo === "entrada"){
        dados.entrada = valor;
        dados.saida = null;
      }else if (this.state.tipo === "saida"){
        dados.saida = valor;
        dados.entrada = null;
      }

      axios.post("http://localhost:8080/lancamentos",dados)
        .then(response => {
          this.setState((prevState) => {
            return {lancamentos:[...prevState.lancamentos, response.dados]}
          });
          this.clearForm();
          this.updateTable();
        })
        .catch(error => {
          console.log(error);
        })      
  }

  render() {
    return (
      <>
        <Modal
          show={this.props.showModal}
          onHide={this.props.handleClose}
          title={this.props.title}
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
                  checked={this.state.tipo === "entrada"}
                  onChange={this.handleTipoChange}
                  id="entrada"
                />
                <Form.Check
                  className="form-check"
                  type="radio"
                  label="Saídas R$"
                  value="saida"
                  checked={this.state.tipo === "saida"}
                  onChange={this.handleTipoChange}
                  id="saida"
                />
              </div>
                <Form.Group className="form-group" controlId="formDataContabil">
                <Form.Label className="label-style">Data</Form.Label>
                <Form.Control
                  className="form-input"
                  type="date"
                  placeholder="Data contábil"
                  value={this.state.data}
                  onChange={this.handleChange}
                  id="data"
                />
              </Form.Group>

              <Form>
                <Form.Group className="form-group" controlId="formValor">
                  <Form.Label className="label-style" style={this.getColor()}> Valor R$ </Form.Label>
                  <Form.Control
                    className="form-input"
                    type="number"
                    placeholder="0.00"
                    value={this.state.valor}
                    onChange={this.handleChange}
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
                  value={this.state.historico}
                  onChange={this.handleChange}
                  id="historico"
                />
              </Form.Group>

              <Form.Group className="form-group" controlId="formFinalidade">
                <Form.Label className="label-style">Finalidade</Form.Label>
                <Form.Control
                  className="form-input"
                  type="text"
                  placeholder=""
                  value={this.state.finalidade}
                  onChange={this.handleChange}
                  id="finalidade"
                />
              </Form.Group>

              <Form.Group className="form-group" controlId="formBancoCaixa">
                <Form.Label className="label-style">Banco/Caixa</Form.Label>
                <Form.Control as="select" className="form-input" value={this.state.bancoCaixa} onChange={this.handleFormaDaTransacao} id="bancoCaixa" >
                  <option> Selecione</option>
                  <option>CAIXA</option>
                  <option>ITAÚ</option>
                </Form.Control>
       
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleSubmit}>
              Salvar
            </Button>
            <Button variant="danger" onClick={this.handleClose}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default MainForm;
