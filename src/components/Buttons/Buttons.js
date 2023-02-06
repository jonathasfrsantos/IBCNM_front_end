import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import MainForm from "../MainForm/MainForm";
import "./styles.css";

function Buttons() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [tipo, setTipo] = useState("");

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSelect = (e) => {
    setTipo(e);
  };

  return (
    <div className="buttons-container">
      <Button
        variant="secondary"
        className="buttons-button-main"
        onClick={() => handleShow("Adicionar")}
      >
        {" "}
        Adicionar{" "}
      </Button>
      <Button variant="primary" className="buttons-button">
        Default
      </Button>
      <Button variant="primary" className="buttons-button">
        Exportar
      </Button>
      <Button variant="primary" className="buttons-button">
        Imprimir
      </Button>
      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton> 
                <Modal.Title> Novo Lançamento </Modal.Title>
            </Modal.Header>
      <Modal.Body>
         <MainForm close={handleClose} />
      </Modal.Body>
       
    </Modal>
    </div>
  );
}

export default Buttons;
