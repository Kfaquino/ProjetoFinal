import React, { useEffect, useState } from "react";
import  { useHistory }  from 'react-router-dom'
import { Button, Card} from 'antd';
import api from '../../services/api';npm
import './styles.css'

export default function Produtos(){
    const [ produtos, setProdutos ] = useState([])
    const history = useHistory()

    useEffect(() => {
        api.get('/item')
        .then((response) => {
        setProdutos(response.data)
        })
    .catch((err) => {
        console.log("Aconteceu um erro inesperado" + err)
    })
    }, [])

    return(
        <div className="produto_container">
            <h1>Relação de todos os produtos</h1>

            <div className="produto_card_container">
                {produtos.map(produto => (
                    <Card key={produto.id} title={produto.name} bordered={false} style={{width: 300}}>
                        <p> Descrição:{produto.description} </p>
                        <p> Quantidade:{produto.quantity} </p>
                        <div>
                            <Button onClick={() => history.push(`/detalhes/${produto.id}`) }>Detalhes</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )}