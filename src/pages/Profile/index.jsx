import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiSettings, FiUpload } from 'react-icons/fi';
import avatar from '../../assets/avatar.png';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import '../../styles/pages/profile.scss';

function Profile() {
    const { user } = useContext(AuthContext);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

    return ( 
        <div>
            <Header/>
            <div className='content'>
                <Title name='Minha conta'>
                    <FiSettings size={25}/>
                </Title>
                <div className='container'>
                    <form className='form-profile'>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#fff' size={25}/>
                            </span>
                            <input type="file" accept='image/*'/><br />
                            {avatarUrl === null ? (
                                <img src={avatar} alt="Foto de perfil" width={250}  height={250} />
                            ) : (
                                <img src={avatarUrl} alt="Foto de perfil" width={250}  height={250} />
                            )}
                        </label>
                        <label>Nome</label>
                        <input type="text" placeholder='Seu nome' />
                        <label>Email</label>
                        <input type="text" placeholder='teste@teste.com' disabled={true} />
                        <button type="submit">Salvar</button>
                    </form>
                </div>
                <div className='container'>
                    <button className='logout-btn'>Sair</button>
                </div>
                
            </div>
        </div>
    );
}

export default Profile;