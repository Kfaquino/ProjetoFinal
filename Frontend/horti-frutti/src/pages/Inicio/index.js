import './styles.css'
import { useHistory } from 'react-router-dom'
import Logo from '../assets/logo.png'
import { Button } from 'antd' 

export default function Inicio(){

    const history = useHistory()

    async function listarProdutos(event){
        event.preventDefault();
       history.push('/produtos')
    }

    return(
        <div className='inicio_container'> 
            <section>
              <img src={Logo} alt='logo' className='center' />  
              <br/>
              <Button className='center' onClick={listarProdutos}>Ver Produtos</Button>
            </section>
        </div>
    )}