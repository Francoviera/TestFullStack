import React, { useEffect, useState } from 'react'

const ModalFriend = React.forwardRef((props, ref) => {

    const [friend, setFriend] = useState({
        nombre: null,
        apellido: null,
        dni: null,
        fechaDeNacimiento: null
    });
    const [action, setAction] = useState(""); 
    const [loading, setLoading] = useState(false); 

    useEffect(() => { 
        setAction(props.data.action)
        if(props.data.friend){
            setFriend(props.data.friend);
        }
    }, [props]);

    const submit = async () => {
        setLoading(true);

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let data= JSON.stringify(friend);

        let requestOptions = {
            method: props.data ? "PUT" : "POST",
            headers: myHeaders,
            redirect: 'follow',
            body: data,
        };
        await fetch(process.env.REACT_APP_BE_URL + '/friends', requestOptions)
          .then(res => res.json())
          .then(json => {
            window.location.reload();
          })
    }


    return (
        <>
            { loading ?
                "Loading..."
                
                : 
                <div class="row">

                    <div class="col-md-6 margin-auto">
                        <h2 >{ props.data.friend ? "Editar" : "Agregar" }</h2>

                        <form class="mr-auto mb-3 mt-5">
                            <div class="form-group">
                                <label for="exampleInputEmail1">Nombre</label>
                                <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Nombre"  
                                    value={friend.nombre}
                                    onChange={e => setFriend({ ...friend, nombre: e.target.value })}>

                                </input>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Apellido</label>
                                <input type="text" class="form-control" id="surname" aria-describedby="emailHelp" placeholder="Apellido"  
                                    value={friend.apellido}
                                    onChange={e => setFriend({ ...friend, apellido: e.target.value })}

                                ></input>
                            
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">DNI</label>
                                <input type="number" class="form-control" id="dni" aria-describedby="emailHelp" placeholder="DNI" 
                                    value={friend.dni}
                                    onChange={e => setFriend({ ...friend, dni: e.target.value })}>
                                </input>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Fecha de nacimiento</label>
                                <input type="date" class="form-control" id="birthday" aria-describedby="emailHelp" placeholder="Enter email" 
                                    value={friend.fechaDeNacimiento}
                                    onChange={e => setFriend({ ...friend, fechaDeNacimiento: e.target.value })}>
                                 </input>
                            </div>
                            <button type="button" class="btn btn-primary mt-5" onClick={() => submit()}>{ props.data.friend ? "Acctualizar" : "Agregar" }</button>
                        </form>
                    </div>
                </div>
            }

        </>
    );

});

export default ModalFriend