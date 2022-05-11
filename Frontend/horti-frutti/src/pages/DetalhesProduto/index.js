import api from '../../services/api';
import './styles.css';
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Card, message , Button, Modal} from "antd";
import {ExclamationCircleOutlined, EditOutlined} from '@ant-design/icons';

export default function DetalhesProduto(){

    const [produto, setProduto] = useState([])
    const history = useHistory()
    let {id} = useParams()

    const { confirm } = Modal;

    function showConfirm(produto){
        confirm({
            title: 'Você quer realmente deletar este item:',
            icon: <ExclamationCircleOutlined />,
            content: produto.name,
            onOK(){
                handleDelete(produto.id);
            },
            onCancel(){
                console.log('Cancel');
            },
        });
    }

    function handleDelete(id){
        api.delete(`/item/${id}`)
        .then((response) => {
           if(response.status === 200){
               message.success("Produto foi excluido com sucesso!")
               history.push('/produtos')
           }
        })
        .catch((err) => {
            message.error("Aconteceu um erro inesperado")
        })
    }

    useEffect(() => {
        api.get(`/item/${id}`)
        .then((response) => {
        setProduto(response.data)
        })
        .catch((err) => {
            message.error("Aconteceu um erro inesperado!" + err)
        })
},[id])/*reclamando pelo ID */

    return(
        <div className="produto_container">
            <h1>
                Detalhes do produto 
            </h1>
            <br/>
            <div className=' produto_card_container'>
                <Card key={produto.id} title={produto.name} bordered={false} style={{width: 300}}>
                <p> Id: {produto.id} </p>
                <p> UpdatedAt: {produto.updatedAt} </p>
                <p> Descrição: {produto.description} </p>
                <p> Quantidade: {produto.quantity} </p>
                <hr/>
                <div className='produto_card_actions'>
                    <Button type="primary" success icon={<EditOutlined/>} onClick={() => history.push(`/editar/${produto.id}`, produto)}>Editar produto</Button>
                    <Button type="primary" danger onClick={() => showConfirm(produto)}>Excuir produto</Button>
                </div>
                </Card>
            </div>
        </div>
    )}