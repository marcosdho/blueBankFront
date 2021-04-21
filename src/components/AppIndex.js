import React, {useState} from 'react';
import ReactDom from 'react-dom';
import AddBalance from './views/AddBalance';
import Index from './views/Index';
import Withdraw from './views/Withdraw';
import NewAccount from './views/NewAccount';
import Balance from './views/Balance';
import Buscador from './Buscador';

const AppIndex = () => {
    
    const [view,setView] = useState(<Index/>);
    
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#" onClick={(e)=> setView(<Index />)}>BlueBank</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        {/* <li className="nav-item">
                            <a className="nav-link" id="home" href="#" >Home  <span className="sr-only">(current)</span></a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={()=> setView(<NewAccount />) } >Cuenta</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={()=> setView(<AddBalance />) } >Depósito</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={()=> setView( <Withdraw /> ) } >Retiro</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={()=> setView(<Balance />) } >Consulta</a>
                        </li>
                    </ul>
                    <Buscador method={setView} />
                </div>
            </nav>
            { view }
        </>
    );
}

export default AppIndex;

const contenedor = document.getElementById('app');

if(contenedor) {
    ReactDom.render(<AppIndex/>, contenedor);
}