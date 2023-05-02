import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';

function Dashboard() {
    const { logout } = useContext(AuthContext);

    async function handleLogout(){
        await logout();
    }

    return ( 
        <div>
            <Header/>
            <h1>Página Dashboard</h1>
            <button onClick={handleLogout}>Sair</button>
        </div>
    );
}

export default Dashboard;