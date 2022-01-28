import React, { useEffect, useState } from 'react'
// import { Redirect } from "react-router"
import {DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"



const ListFriends = React.forwardRef((props, ref) => {

    const [friendsList, setFriendsList] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => { 
        if(props.friendList)
            setFriendsList(props.friendList);
    }, [props]);

    const deleteFriend=(friend, index) => {
        setLoading(true);
        props.deleteFriend(friend, index, props.listId);
    }

    const editFriend=(friend, index) => {
        props.editFriend(friend, index, props.listId);
    }

    const changeDateToStringFormat = (date) => {
        return new Date(date).toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})
      }
    return (
        <>
            <h5>{props.listId === "friendList" ? "Lista de Amigos" : "Invitados"}</h5> 
            <ul class="list-group" {...props.props} ref={ref}>
                {   friendsList ?
                    friendsList.length > 0 ?
                        friendsList.map((friend, index) => 
                            <>
                                { friend.active? 
                                    <Draggable key={friend.id.toString()} draggableId={friend.id.toString()} index={index}>
                                        { (draggabledProvided) =>
                                        <li class="list-group-item friend"
                                            {...draggabledProvided.draggableProps}
                                            ref={draggabledProvided.innerRef}
                                            {...draggabledProvided.dragHandleProps}
                                        >
                                            <span class="mr-5">{friend.nombre+" "+friend.apellido}</span> 
                                            <span class="btns-abm">
                                                <p>
                                                    DNI: {friend.dni} <br></br>
                                                    Fecha de nacimiento: {changeDateToStringFormat(friend.fechaDeNacimiento)}
                                                </p>
                                                <a onClick={() => editFriend(friend, index)} class="ml-5">
                                                    <i class="fas fa-pen text-warning"></i>
                                                </a>
                                                <a onClick={() => deleteFriend(friend, index)} class="ml-5" >
                                                    <i class="fas fa-trash text-danger "></i>
                                                </a>
                                            </span>
                                        </li>
                                        }
                                    </Draggable>
                                    : ""
                                }
                            </>
                        )
                        : "No hay ningun amigo por aqui!"
                    : "Loading..."
                }
            </ul>
        </>
    );

});

export default ListFriends