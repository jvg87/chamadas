import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { db } from '../../services/firebaseConection';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';

import { FiPlusCircle } from 'react-icons/fi';

import Header from '../../components/Header';
import  Title from '../../components/Title';

import '../../styles/pages/new.scss';

const listRef = collection(db, 'customers');

function New() {
    const { user } = useContext(AuthContext);

    const [customers, setCustomers] = useState([]);
    const [loadingCustomer, setLoadingCustomer] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [complemento, setComplemento] = useState('');
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');

    useEffect(() => {
        async function loadCustomers(){
            const querySnapshot = await getDocs(listRef)
            .then((snapshot) => {
                let list = [];
                snapshot.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    })
                })

                if (snapshot.docs.size === 0){
                    console.log('Nenhuma empresa encontrada');
                    setCustomers([ {id:'1', nome: 'Freela'} ]); 
                    setLoadingCustomer(false);
                    return;
                }

                setCustomers(list);
                setLoadingCustomer(false);

            })
            .catch((error) => {
                console.log('Erro ao buscar clientes', error);
                setLoadingCustomer(false);
                setCustomers([ {id:'1', nome: 'Freela'} ]);            })
        }

        loadCustomers();
    }, [])

    function handleOptionChange(e){
        setStatus(e.target.value);
    }

    function handleChangeSelect(e){
        setAssunto(e.target.value);
    }

    function handleChangeCustomer(e){
        setCustomerSelected(e.target.value);
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
                        {
                            loadingCustomer ? (
                                <input type="text" disabled={true} value='Carregando...' />
                            ) : (
                                <select id="clientes" value={customerSelected} onChange={handleChangeCustomer}>
                                    {customers.map((item, index) => {
                                        return (
                                            <option key={index} value={index}>
                                                {item.nomeFantasia}
                                            </option>
                                        )
                                    })}
                                </select>
                            )
                        }

                        <label htmlFor='assuntos'>Assunto</label>
                        <select id='assuntos' value={assunto} onChange={handleChangeSelect}>
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