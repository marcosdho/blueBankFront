import React, {useState} from 'react';
import ResultData from './views/ResultData';

const Buscador = ({method}) => {


    const [nroCuenta, setNrocuenta] = useState("");

    const movimientos = async () => {
        if(nroCuenta.length < 10 || nroCuenta.length > 10) {
            alert("El númewro de cuenta debe tener al menos 10 digitos");
            return;
        }

        method("Cargando...");

        await fetch('http://apimarcos.test/api/v1/movimients', {
        //await fetch('https://apimarcos.herokuapp.com/public/api/v1/movimients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify({account:nroCuenta})
        })
        .then(resp => resp.json())
        .then((data) => {
            method(<ResultData lista={data.lista} account={nroCuenta} />);
            setNrocuenta('');
        })
        .catch((err) => {
            console.log(err);
        })
        
    }

    return (
        <>
            <div className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" value={nroCuenta} onChange={({target}) => setNrocuenta(target.value) } placeholder="Nro Cuenta Cliente" aria-label="Search"/>
                <button className="btn btn-outline-success my-2 my-sm-0" onClick={()=>movimientos()}>Ver Movimientos</button>
            </div>
        </>
    )
}

export default Buscador;