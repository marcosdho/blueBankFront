import React,{useState,useEffect} from 'react';

const Withdraw = () => {

    const getOut = {
        account:'',
        amount:''
    };

    const [dataOut,setDataOut] = useState(getOut)
    const [requestOut,setRequestOut] = useState("")

    const datosWithdraw = ({target}) => {
        setDataOut({
            ...dataOut,
            [target.name]:target.value
        })
    }

    const getWithdraw = async ()=> {
        await fetch('http://apimarcos.test/api/v1/newWithdraw', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'X-Requested-With':'XMLHttpRequest'
            },
            body: JSON.stringify(dataOut)
        })
        .then((resp) => resp.json())
        .then((data) => {
            if(data.error){
                setRequestOut(<div className="alert alert-warning" role="alert">{data.message} </div>)
                return;
            }
            setDataOut(getOut)
            console.log(data)
            setRequestOut(<div className="alert alert-success" role="alert">{data.info.username} su Retiro con la cuenta N°: {dataOut.account} y el monto de {dataOut.amount} se efectuó con éxito </div>)
        })
        .catch((err) =>{
            setRequestOut(err.message)
        })
    }

    useEffect(() =>{
        setDataOut(getOut)
    },[])

    return (
        <>
            <div className="card mt-5">
                <div className="card-header bg-primary text-white header-elements-inline">
                    <span className="card-title "> <h5>Nuevo Retiro</h5> </span>
                </div>
                <div className="card-body">
                    <div className="row">
                        
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <label>Nro Cuenta Cliente</label>
                                <input type="number" name="account" onChange={(e)=>datosWithdraw(e)} value={dataOut.account} maxLength="10" minLength="10" className="form-control" placeholder="Úlitmos 10 digitos de cuenta"/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <label>Monto a Retirar</label>
                                <input type="number" name="amount" onChange={(e)=>datosWithdraw(e)} value={dataOut.amount}  className="form-control" placeholder="Monto a Retirar"/>
                            </div>
                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <button className="btn btn-primary" onClick={()=>getWithdraw()}>Retirar Fondos</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
                {requestOut}
        </>
    )
}

export default Withdraw;
