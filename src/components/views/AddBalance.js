import React,{useState, useEffect} from 'react';

const AddBalance = () => {

    const  getData = {
        account:'',
        amount:''
    };

    const [dat,setDat] = useState(getData)
    const [request,setRequest] = useState("")

    const datosDeposit = ({target}) => {
        setDat({
            ...dat,
            [target.name]:target.value
        })
    }

    const setAddBalance = async () => {
        setRequest("")
        await fetch('http://apimarcos.test/api/v1/newDeposit', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'X-Requested-With':'XMLHttpRequest'
            },
            body: JSON.stringify(dat)
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.error){
                setRequest(<div className="alert alert-warning" role="alert">{data.message} </div>)
                return;
            }
            setDat(getData)
            setRequest(<div className="alert alert-success" role="alert">{data.info.username} su Depósito con la cuenta N°: {dat.account} y el monto de {dat.amount} se efectuó con éxito </div>)
        })
        .catch((err) => {
            console.log(err)
            setRequest(err.message)
        })
    }

    useEffect(() => {
        setDat(getData);
    }, [])



    return (
        <>
            <div className="card mt-5">
                <div className="card-header bg-primary text-white header-elements-inline">
                    <span className="card-title "> <h5>Nuevo Depósito</h5> </span>
                </div>
                <div className="card-body">
                    <div className="row">
                        
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <label>Ingrese su número de cuenta</label>
                                <input type="number" name="account" onChange={(e)=>datosDeposit(e)} value={dat.account} maxLength="10" minLength="10" className="form-control" placeholder="Número de cuenta"/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <label>Monto a Consignar</label>
                                <input type="number" name="amount" onChange={(e)=>datosDeposit(e)} value={dat.amount} className="form-control" placeholder="Monto"/>
                            </div>
                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <button className="btn btn-primary" onClick={()=>setAddBalance()}>Consignar Depósito</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
                {request}
        </>
    )
}

export default AddBalance;
