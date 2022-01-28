import React, { useEffect, useState } from 'react'

const Birthdays = ({match}) => {

    const [birthdays, setBirthDays] = useState(null); 

    const [loading, setLoading] = useState(false); 


    useEffect(async () => { 
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: 'follow',
        };
        let anio=  new Date().getFullYear();
        await fetch(process.env.REACT_APP_BE_URL + '/birthday', requestOptions)
          .then(res => res.json())
          .then(birthday => {
            setBirthDays(birthday);
        }) 
    }, []);

    return (
        <>
            { loading ?
                "Loading..."
                
                : 
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 margin-auto mt-5">
                            <ul class="list-group">
                                { birthdays ? 
                                    birthdays.length > 0 ?
                                        birthdays.map((birthday) =>
                                            <>
                                                <li class="list-group-item birthday">
                                                    <p class="mr-5">año: {birthday.year} </p> 
                                                    <p>Amigos: {birthday.friends.length}</p>
                                                    <div class="list-friends">
                                                        {   birthday?.friends.length > 0 ?
                                                                birthday.friends.map((friend) => 
                                                                    friend.active ?
                                                                        <>
                                                                            <p><span class="ml-5">nombre: {friend.nombre}</span> <span class="ml-5">apellido: {friend.apellido}</span></p>
                                                                        </>
                                                                    : ""
                                                                )
                                                            : "no hay amigos por aqui!"
                                                        }
                                                    </div>
                                                </li>
                                            </> 
                                        )
                                    : "No hay Cumpleaños todavia!"
                                    : "loading..."
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </>
    );

}

export default Birthdays