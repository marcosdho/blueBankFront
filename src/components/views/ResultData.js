import React,{useState, useEffect} from 'react';

const ResultData = ({lista, account}) => {

    const [fi, setFi] = useState('Cargando...');
    const final = lista.map((item,i) => {
        return <tr>
            <td>{item.username}</td>
            <td>{item.type}</td>
            <td>{item.amount}</td>
            <td>{item.fecha}</td>
        </tr>
    })
    setTimeout(() => {
        setFi(final);
    }, 1500);

    return (
        <>
            <h1>Moviemientos de la cuenta { account }</h1>
            
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Tipo</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    { fi }  
                </tbody>
            </table>
            
        </>
    )
}

export default ResultData;