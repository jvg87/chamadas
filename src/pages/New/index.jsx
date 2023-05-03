import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/auth';
import { db } from '../../services/firebaseConection';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc } from 'firebase/firestore';

import { FiPlusCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

import Header from '../../components/Header';
import  Title from '../../components/Title';

import '../../styles/pages/new.scss';

const listRef = collection(db, 'customers');

function New() {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [loadingCustomer, setLoadingCustomer] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [complemento, setComplemento] = useState('');
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [idCustomer, setIdCustomer] = useState(false);

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

                if (id){
                    loadId(list);
                }

            })
            .catch((error) => {
                console.log('Erro ao buscar clientes', error);
                setLoadingCustomer(false);
                setCustomers([ {id:'1', nome: 'Freela'} ]);            
            })
        }

        loadCustomers();
    }, [id]);

    async function loadId(list){
        const docRef = doc(db, 'chamados', id);
        await getDoc(docRef)
        .then((snapshot) => {
            setAssunto(snapshot.data().assunto);
            setStatus(snapshot.data().status);
            setComplemento(snapshot.data().complemento);

            let index = list.findIndex(item => item.id === snapshot.data().clienteId);
            setCustomerSelected(index);
            setIdCustomer(true);
        })
        .catch((error) => {
            setIdCustomer(false);
            console.log(error);
        })
    }

    function handleOptionChange(e){
        setStatus(e.target.value);
    }

    function handleChangeSelect(e){
        setAssunto(e.target.value);
    }

    function handleChangeCustomer(e){
        setCustomerSelected(e.target.value);
    }

    async function handleRegister(e){
        e.preventDefault();

        // Atualizando chamado
        if(idCustomer){
            const docRef = doc(db, 'chamados', id);
            await updateDoc(docRef, {
                cliente: customers[customerSelected].nomeFantasia,
                clienteId: customers[customerSelected].id,
                assunto: assunto,
                complemento: complemento,
                status: status,
                userId: user.uid
            })
            .then(() => {
                toast.info('Chamado atualizado com sucesso!')
                setCustomerSelected(0);
                setComplemento('');
                navigate('/dashboard')
            })
            .catch((error) => {
                toast.error('Ops, erro ao atualizar esse chamado!')
                console.log(error);
            })
            return;
        }

        // Registrar chamado
        await addDoc(collection(db, 'chamados'), {
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            assunto: assunto,
            complemento: complemento,
            status: status,
            userId: user.uid
        })
        .then(() => {
            toast.success('Chamado registrado!');
            setComplemento('');
            setCustomerSelected(0);
        })
        .catch((error) => {
            toast.error('Ops, erro ao registrar, tente mais tarde!')
            console.log(error);
        })
    }

    return ( 
        <div>
            <Header/>
            <div className="content">
                <Title name={id ? 'Editando Chamado' : 'Novo Chamado'}>
                    <FiPlusCircle size={25}/>
                </Title>
                <div className="container">
                    <form className='form-profile' onSubmit={handleRegister}>
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