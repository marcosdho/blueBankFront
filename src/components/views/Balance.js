import React,{useState,useEffect} from 'react';
import ResultData from '../views/ResultData';

const Balance = () => {
    const getBalanceData = { //ResultData 
        account:'',
    };

    const [dataBalance,setBalance] = useState(getBalanceData)
    const [requestBalance,setRequestBalance] = useState("")
    const [listSaldo,setListaSaldo] = useState("")

    const datosBalance = ({target}) => {
        setBalance({
            ...dataBalance,
            [target.name]:target.value
        })
    }

    const getBalance = async ()=> {
        setListaSaldo("")
        setRequestBalance("")
        if(dataBalance.account == ""){
            setRequestBalance(<div className="alert alert-warning" role="alert">Debe indicar la cuenta Bancaria </div>)
            return;
        }
        
        await fetch('http://apimarcos.test/api/v1/getBalance/'+dataBalance.account, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'X-Requested-With':'XMLHttpRequest'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            if(data.error){
                setRequestBalance(<div className="alert alert-warning" role="alert">{data.message} </div>)
                return;
            }
            setBalance(getBalanceData)
            setListaSaldo(/* data.details.actualBalance */
                <table className="table table-hover">
                <thead>
                    <tr>
                        <th>N° de cuenta</th>
                        <th>Total Depósitos</th>
                        <th>Total Retitos</th>
                        <th>Total Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{dataBalance.account}</td>
                        <td>{data.details.totalDepositos}</td>
                        <td>{data.details.totalRetiros}</td>
                        <td>{data.details.actualBalance}</td>
                    </tr>
                </tbody>
            </table>
                );
            
            
            
            /* setRequestBalance(<div className="alert alert-success" role="alert">{data.info.username} su Retiro con la cuenta N°: {dataBalance.account} y el monto de {dataBalance.amount} se efectuó con éxito </div>) */
        })
        .catch((err) =>{
            setRequestBalance(<div className="alert alert-warning" role="alert">{err.message} </div>)
        })
    }

    useEffect(() =>{
        setBalance(getBalanceData)
    },[])
    return (
        <>
            <div className="card mt-5">
                <div className="card-header bg-primary text-white header-elements-inline">
                    <span className="card-title "> <h5>Consulta de Saldo</h5> </span>
                </div>
                <div className="card-body">
                    <div className="row">
                        
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <label>Número de Cuenta Cliente</label>
                                <input type="number" name="account" onChange={()=>datosBalance()} value={dataBalance.account} maxLength="10" minLength="10" onChange={(e)=>datosBalance(e)} className="form-control" placeholder="Ingrese su número de cuenta"/>
                            </div>
                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <button className="btn btn-primary" onClick={()=>getBalance()} >Hacer Consulta</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
                {listSaldo}
            {requestBalance}
        </>
    )
}

export default Balance;
