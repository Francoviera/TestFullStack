import React, { useEffect, useState } from 'react'
// import { Redirect } from "react-router"
import {DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"



const ListFriends = React.forwardRef((props, ref) => {

    const [friendsList, setFriendsList] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => { 
        console.log(props, ref)
        if(props.friendList)
            setFriendsList(props.friendList);
    }, [props]);

    const deleteFriend=(friend, index) => {
        props.deleteFriend(friend, index, props.listId);
    }

    return (
        <>
            <ul class="list-group" {...props.props} ref={ref}>
                {   friendsList ?
                    friendsList.map((friend, index) => 
                        <>
                            <Draggable key={friend.id} draggableId={friend.id} index={index}>
                                { (draggabledProvided) =>
                                <li class="list-group-item"
                                    {...draggabledProvided.draggableProps}
                                    ref={draggabledProvided.innerRef}
                                    {...draggabledProvided.dragHandleProps}
                                ><span class="mr-5">{friend.name}</span> <a onClick={() => deleteFriend(friend, index)}><i class="fas fa-trash text-danger icon-trash"></i></a></li>
                                }
                            </Draggable>
                        </>
                    )
                    : "Loading..."
                }
            </ul>
        </>
    );

});

export default ListFriends