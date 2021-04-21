import React,{useState, useEffect} from 'react';

const NewAccount = () => {

    const inicialData = {
        name:'',
        amount:''
    };

    const [datos,setDatos] = useState(inicialData)
    const [respuesta,setRespuesta] = useState("")

    const datosUser = ({target}) => {
        setDatos({
            ...datos,
            [target.name]:target.value
        })
    }

    const setNewAccount = async () => {
        setRespuesta("")

        await fetch('http://apimarcos.test/api/v1/newAccount' , {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'X-Requested-With':'XMLHttpRequest'
            },
            body: JSON.stringify(datos),
        })
        .then(resp => resp.json())
        .then((data) => {
            if(data.error){
                setRespuesta(<div className="alert alert-warning" role="alert">{data.message} </div>)
                return;
            }
            setDatos(inicialData);
            console.log(data)
            setRespuesta(<div className="alert alert-success" role="alert">{datos.name} su cuenta N°:{data.accountData.accountnumber} con el monto de {datos.amount} ha sido creada exitosamente... </div>)
            //setRespuesta(<h4>Numero de Cuenta: {data.accountData.accountnumber} </h4>)
        })
        .catch((err) => {
            console.log(err);
            setRespuesta(err.message)
        })


    }

    useEffect(() => {
        setDatos(inicialData);
    }, [])


    return (
        <>
            <div className="card mt-5">
                <div className="card-header bg-primary text-white header-elements-inline">
                    <span className="card-title "> <h5>Crear Cuenta</h5> </span>
                </div>
                <div className="card-body">
                    <div className="row">
                        
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <label>Nombre del Cliente</label>
                                <input type="text" name="name" value={datos.name} onChange={(e) => datosUser(e) } className="form-control" placeholder="Cliente"/>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <label>Saldo Inicial</label>
                                <input type="number" name="amount" value={datos.amount} onChange={(e) => datosUser(e) } className="form-control" placeholder="Saldo Inicial"/>
                            </div>
                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="form-group">
                                <button className="btn btn-primary" onClick={() => setNewAccount()}>Crear Cuenta</button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
                {respuesta}
        </>
    )
}

export default NewAccount;
