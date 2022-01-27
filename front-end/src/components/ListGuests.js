import React, { useEffect, useState } from 'react'
// import { Redirect } from "react-router"

import {DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"


const ListFriends = React.forwardRef((match, ref) => {

    const [friendsList, setFriendsList] = useState(
        [
            {
                id: "9",
                name:"Franco"
            },
            {
                id: "7",
                name:"Zarate"
            },
            {
                id: "8",
                name:"gaspar"
            },
        ]
        
    )
    const [loading, setLoading] = useState(true); 

    useEffect(() => { 
        console.log(ref)
    }, []);

    return (
        <>
            <ul class="list-group" {...match.props} ref={ref}>
            { friendsList.map((friend, index) => 
                    <>
                        <Draggable key={friend.is} draggableId={friend.id} index={index}>
                            { (draggabledProvided) =>
                            <li class="list-group-item"
                                {...draggabledProvided.draggableProps}
                                ref={draggabledProvided.innerRef}
                                {...draggabledProvided.dragHandleProps}
                            >{friend.name}</li>}
                        </Draggable>
                    </>
                )}
            </ul>
        </>
    );

});

export default ListFriends