import { useState } from 'react';
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiUser } from 'react-icons/fi';
import { addDoc ,collection } from 'firebase/firestore';
import { db } from '../../services/firebaseConection';
import { toast } from 'react-toastify';

function Customers() {
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endereco, setEndereco] = useState('');

    async function handleRegister(e){
        e.preventDefault();
        
        if (nome !== '' && cnpj !== '' && endereco !== ''){
            await addDoc(collection(db, 'customers'), {
                nomeFantasia: nome,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(() => {
                setNome('');
                setCnpj('');
                setEndereco('');
                toast.success('Empresa registrada!');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Erro ao fazer o cadastro.');
            })
        } else {
            toast.error('Preencha todos os campos!')
        }
    }

    return ( 
        <div>
            <Header/>
            <div className="content">
                <Title name='Clientes'>
                    <FiUser size={25}/>
                </Title>
                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label htmlFor='nome'>Nome fantasia</label>
                        <input 
                            id='nome'
                            type="text" 
                            placeholder="Nome da empresa"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <label htmlFor='cnpj'>CNPJ</label>
                        <input 
                            id='cnpj'
                            type="CNPJ" 
                            placeholder="Digite o CNPJ"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                        />
                        <label htmlFor='endereco'>Endereço</label>
                        <input 
                            id='endereco'
                            type="text" 
                            placeholder="Endereço da empresa"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                        />
                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Customers;