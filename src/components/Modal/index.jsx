import { FiX } from 'react-icons/fi';

import '../../styles/components/modal.scss';

function Modal() {
    return ( 
        <div className='modal'>
            <div className="container">
                <button className='close'>
                    <FiX size={25} color='#fff'/>
                    Fechar
                </button>
                <main>
                    <h2>Detalhes do Chamado</h2>
                    <div className='row'>
                        <span>
                            Cliente: <i>Mercadoz</i>
                        </span>
                    </div>
                    <div className='row'>
                        <span>
                            Assunto: <i>Suporte</i>
                        </span>
                        <span>
                            Cadastrado em: <i>22/08/2023</i>
                        </span>
                    </div>
                    <div className='row'>
                        <span>
                            Status: <i>Aberto</i>
                        </span>
                    </div>
                    <>
                        <h3>Complementos</h3>
                        <p>
                            Aqui vai todo complemento do chamado
                        </p>
                    </>
                </main>
            </div>
        </div>
    );
}

export default Modal;