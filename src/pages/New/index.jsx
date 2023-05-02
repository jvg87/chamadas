import { useState } from 'react';

import { FiPlusCircle } from 'react-icons/fi';

import Header from '../../components/Header';
import  Title from '../../components/Title';

import '../../styles/pages/new.scss';

function New() {
    const [customers, setCustomers] = useState([]);

    const [complemento, setComplemento] = useState('');
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');

    function handleOptionChange(e){
        setStatus(e.target.value);
        console.log(e.target.value);
    }

    return ( 
        <div>
            <Header/>
            <div className="content">
                <Title name='Novo chamado'>
                    <FiPlusCircle size={25}/>
                </Title>
                <div className="container">
                    <form className='form-profile'>
                        <label htmlFor='clientes'>Clientes</label>
                        <select id='clientes'>
                            <option key={1} value={1}>Mercado Teste</option>
                            <option key={2} value={2}>Loja Teste</option>
                        </select>

                        <label htmlFor='assuntos'>Assunto</label>
                        <select id='assuntos'>
                            <option key={1} value='Suporte'>Suporte</option>
                            <option key={2} value='Visita Tecnica'>Visita Tecnica</option>
                            <option key={3} value='Financeiro'>Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input
                                id='aberto' 
                                type="radio" 
                                name="radio" 
                                value='Aberto' 
                                onChange={handleOptionChange}
                                checked={ status === 'Aberto' }
                            />
                            <label htmlFor='aberto'>Em aberto</label>
                            <input 
                                id='progresso' 
                                type="radio" 
                                name="radio" 
                                value='Progresso' 
                                onChange={handleOptionChange}
                                checked={ status === 'Progresso' }
                            />
                            <label htmlFor='progresso'>Progresso</label>
                            <input 
                                id='antendido' 
                                type="radio" 
                                name="radio" 
                                value='Atendido' 
                                onChange={handleOptionChange}
                                checked={ status === 'Atendido' }
                            />
                            <label htmlFor='antendido'>Antendido</label>
                        </div>

                        <label htmlFor='problema'>Complemento</label>
                        <textarea 
                            id='problema' 
                            type='text' 
                            placeholder='Descreva seu problema (opcional)'
                            value={complemento}
                            onChange={(e) => setComplemento(e.target.value)}
                        />

                        <button type="submit">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default New;