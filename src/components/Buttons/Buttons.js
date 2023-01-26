import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import MainForm from '../MainForm/MainForm';
import './styles.css';


class Buttons extends Component {
  constructor(props){
    super(props);
    this.state = { showModal: false, title:""};

  this.handleShow = this.handleShow.bind(this);
  this.handleClose = this.handleClose.bind(this);


}

  handleShow(title){
    this.setState({ showModal:true, title});
  }

  handleClose(){
    this.setState({ showModal: false});
  }

  handleSelect(e){
    this.setState({tipo: e})
  }

  render() {
    return (
      <div className="buttons-container">
        <Button variant="secondary" className="buttons-button-main" onClick={() => this.handleShow("Adicionar")}> Adicionar </Button>
        <Button variant="primary" className="buttons-button">Default</Button>
        <Button variant="primary" className="buttons-button">Exportar</Button>
        <Button variant="primary" className="buttons-button">Imprimir</Button>
        <MainForm showModal={this.state.showModal} handleClose={this.handleClose} title={this.state.modalTitle} tipo={this.state.tipo}/>
      </div>
    );
  }
}

export default Buttons;
