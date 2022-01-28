import React, { useEffect, useState } from 'react'
// import { Redirect } from "react-router"



const ListFriends = ({match}) => {

    const [internment, setInternment] = useState({})
    const [loading, setLoading] = useState(true); 

    useEffect(() => { 

    }, []);

    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand ml-3" href="#">APP</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <a class="nav-link" href="/">Home <span class="sr-only"></span></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="/cumpleanios">Cumpleaños <span class="sr-only"></span></a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );

}

export default ListFriends