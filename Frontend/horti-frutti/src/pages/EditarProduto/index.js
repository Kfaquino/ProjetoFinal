import './styles.css'
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useHistory, useLocation } from 'react-router-dom';
import { message, Input, Button, InputNumber } from 'antd';

export default function EditarProduto(){

    const history = useHistory()
    const location = useLocation()
    const [ produtoEdit, setProdutoEdit]= useState({})

    useEffect(() => {
        console.log(location.state)
        setProdutoEdit( {...location.state})
    },[location])

    async function handleSubmit(produtoEdit){
        api.patch(`/item/${produtoEdit.id}`, produtoEdit )
        .then((response) => {
            if(response.status === 200){
                message.success('Editado com sucesso', 5);
                history.push('/produtos')
            }
        })
        .catch((err) => {
            message.warning("Aconteceu um erro inesperado" + err.response.message[0], 5);
        })
    }

    return(
       <div className='produto_container'>
           <h1>Editar Produto</h1>
           <br/>
           <div className='produto_edit'>

                <div className='produto_campo'>
                    <span className='produto_label'>Nome do produto:</span>
                    <Input value={produtoEdit?.name} onChange={(e) => 
                    { setProdutoEdit((produtoEdit) => {
                        return { ...produtoEdit, name: e.target.value };
                    });
                    }} />
                </div>
               
                <div className='produto_campo'>
                    <span className='produto_label'>Descrição do produto:</span>
                    <Input value={produtoEdit?.description} onChange={(e) => 
                    { setProdutoEdit((produtoEdit) => {
                        return { ...produtoEdit, description: e.target.value };
                    });
                    }} />
                </div>

                <div className='produto_campo'>
                    <span className='produto_label'>Quantidade do produto:</span>
                    <InputNumber value={produtoEdit?.quantity} onChange={(e) => 
                    { setProdutoEdit((produtoEdit) => {
                        return { ...produtoEdit, quantity: e };
                    });
                     }}/>
                </div>
                <Button type="primary" className='editar_btn' onClick={() => handleSubmit(produtoEdit)} >Editar</Button>
           </div>
       </div> 
    )}