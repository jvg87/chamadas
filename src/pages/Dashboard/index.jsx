import { useContext, useEffect, useState } from 'react';
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { collection, getDocs, orderBy, limit, startAfter, query } from 'firebase/firestore';
import { db } from '../../services/firebaseConection';

import { format } from 'date-fns';

import Header from '../../components/Header';
import Title from '../../components/Title';
import Modal from '../../components/Modal';

import '../../styles/pages/dashboard.scss';

const listRef = collection(db, 'chamados')

function Dashboard() {
    const { logout } = useContext(AuthContext);
    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState();
    const [loadingMore, setLoadingMore] = useState(false);

    useEffect(() => {
        async function loadChamados(){
            const q = query(listRef, orderBy('created', 'desc'), limit(5));

            const querySnapshot = await getDocs(q);
            setChamados([]);
            await updateState(querySnapshot);

            setLoading(false);

        }

        loadChamados();

        return () => { }
    }, [])

    async function updateState(querySnapshot){
        const isCollectionEmpty = querySnapshot.size === 0;

        if (!isCollectionEmpty){
            let list = [];
            querySnapshot.forEach((doc) => {
                list.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created, 
                    createdFormart: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento
                })
            })

            const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]; //Pegando o ultimo item

            setChamados(chamados => [...chamados, ...list])
            setLastDocs(lastDoc);

        } else {
            setIsEmpty(true);
        }   

        setLoadingMore(false);
    }

    async function handleMore(){
        setLoadingMore(true);

        const q = query(listRef, orderBy('created', 'desc'), startAfter(lastDocs), limit(5)); 
        const querySnapshot = await getDocs(q);
        await updateState(querySnapshot);

    }

    if (loading){
        return (
            <div>
                <Header/>

                <div className="content">
                    <Title name='Tickets'>
                        <FiMessageSquare size={25}/>
                    </Title>
                    <div className='container dashboard'>
                        <span>Buscando chamados...</span>
                    </div>
                </div>
            </div>
        )
    }

    return ( 
        <div>
            <Header/>
            <div className="content">
                <Title name='Tickets'>
                    <FiMessageSquare size={25}/>
                </Title>
                <>
                    {chamados.length === 0 ? (
                        <div className="container dashboard">
                            <span>Nenhum chamado encontrado...</span>
                            <Link to='/new' className='new'>
                                <FiPlus size={25} color='#fff'/>
                                Novo Chamado
                            </Link>
                        </div>
                    ) : (
                        <>
                            <Link to='/new' className='new'>
                                <FiPlus size={25} color='#fff'/>
                                Novo Chamado
                            </Link>

                            <table>
                                <thead>
                                    <tr>
                                        <th scope='col'>Cliente</th>
                                        <th scope='col'>Assunto</th>
                                        <th scope='col'>Status</th>
                                        <th scope='col'>Cadastrado em</th>
                                        <th scope='col'>#</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chamados.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td data-label='Cliente'>{item.cliente}</td>
                                                <td data-label='Assunto'>{item.assunto}</td>
                                                <td data-label='Status'>
                                                    <span className='badge' style={{ backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999' }}>{item.status}</span>
                                                </td>
                                                <td data-label='Cadastrado'>{item.createdFormart}</td>
                                                <td data-label='#'>
                                                    <button className='action' style={{ backgroundColor:'#3583f6' }}>
                                                        <FiSearch size={17} color='#fff'/>
                                                    </button>
                                                    <Link to={`/new/${item.id}`} className='action' style={{ backgroundColor:'#f6a935' }}>
                                                        <FiEdit2 size={17} color='#fff'/>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                            {loadingMore && <h3>Buscando mais chamados...</h3>}
                            {!loadingMore && !isEmpty && <button onClick={handleMore} className='btn-more'>Buscar Mais</button>}
                        </>
                    )}
                </>
            </div>
            
            <Modal/>

        </div>
    );
}

export default Dashboard;