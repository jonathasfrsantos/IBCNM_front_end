import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import MainForm from '../MainForm/MainForm';
import './styles.css';

function Buttons2(){

const [showModal, setShowModal] = useState(false);
const [title, setTitle] = useState("");
const [tipo, setTipo] = useState("");

const handleShow = (title) => {
    setShowModal(true);
    setTitle(title);
}

const handleClose = () => {
    setShowModal(false);
}

const handleSelect = (e) => {
    setTipo(e);
}

return (
    <div className="buttons-container">
    <Button variant="secondary" className="buttons-button-main" onClick={() => handleShow("Adicionar")}> Adicionar </Button>
    <Button variant="primary" className="buttons-button">Default</Button>
    <Button variant="primary" className="buttons-button">Exportar</Button>
    <Button variant="primary" className="buttons-button">Imprimir</Button>
    <MainForm showModal={showModal} handleClose={handleClose} title={title} tipo={tipo}/>
  </div>
)



};

export default Buttons2;