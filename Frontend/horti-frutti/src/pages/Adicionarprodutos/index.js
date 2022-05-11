import './Styles.css';
import React from 'react';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { message, Form, Input, Button, InputNumber } from 'antd'; 

export default function AdicionarProdutos(){
    
    const history = useHistory()

    async function handleSubmit(produto){
        api.post('/item', produto)
            .then((response) => {
                if((response.status) === 201) {
                    message.success('Produto adicionado com sucesso!');
                    history.push('/Produtos')
                }      
            })
            .catch((err) => {
                message.error('Aconteceu um erroa ao adicionar o produto' + err.response.data.message)
                })
            }

    return (
        <div className='produto_container'>
            <h1>Adicionar novo produto</h1>
            <br/>

            <div>
                <Form 
                name='submiproduto'
                labelCol={{ span:8 }}
                wrapperCol={{ span: 16}}
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                autoComplete="off"
                >    
                    <Form.Item
                    label='Nome do item'
                    name='name'
                    rules={[{required: true, message: "O nome do item não pode estar vazio"}]}
                    > 
                        <Input/> 
                    </Form.Item>           

                    <Form.Item
                    label='Descrição'
                    name='description'
                    rules={[{required: true, message: "Insira a descriçao do Item"}]}
                    >
                      <Input/> 
                    </Form.Item>

                    <Form.Item
                    label='Quantidade'
                    name='quantity'
                    rules={[{ required: true, message: 'insira a quantidade!' }]}
                    >
                      <InputNumber/> 
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type='primary' htmlType='submit'>
                            Adicionar
                        </Button>
                    </Form.Item> 
                </Form>
            </div>
        </div>
    )}