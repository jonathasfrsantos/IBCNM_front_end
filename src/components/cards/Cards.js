import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import "./styles.css"

function TotalsCards(){
    const [ totalEntradas, setTotalEntradas] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/lancamentos/getTotalEntradas");
                setTotalEntradas(response.data);
           
                
            } catch (error) {
                console.error(error);
                
            }
        };
        fetchData();
    }, []);



    return (
        <div className="card-container">
                <Card>
                    <Card.Body className="card-body">
                        <Card.Title> Entradas R$</Card.Title>
                        <Card.Text> {totalEntradas} </Card.Text>
                      
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body>
                        <Card.Title> Saídas R$</Card.Title>
                        <Card.Text> 20.000,00 </Card.Text>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body>
                        <Card.Title> Saldo anterior R$</Card.Title>
                        <Card.Text> 20.000,00 </Card.Text>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Body>
                        <Card.Title> Saldo atual </Card.Title>
                        <Card.Text> 20.000,00 </Card.Text>
                    </Card.Body>
                </Card>
      
        </div>
    )

}

export default TotalsCards;