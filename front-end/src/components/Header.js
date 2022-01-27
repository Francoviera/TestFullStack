import React, { useEffect, useState } from 'react'
// import { Redirect } from "react-router"



const ListFriends = ({match}) => {

    const [internment, setInternment] = useState({})
    const [loading, setLoading] = useState(true); 

    useEffect(() => { 

    }, []);

    return (
        <>
            <nav class="navbar navbar-light bg-light">
                <span class="navbar-brand mb-0 h1">  Invitados</span>
            </nav>
        </>
    );

}

export default ListFriends