import React, { useEffect, useState } from 'react'
// import { Redirect } from "react-router"
import ListGuests from "../components/ListGuests"
import FriendList from "../components/listFriends"
import {DragDropContext, Droppable, } from "react-beautiful-dnd"

import Header from "../components/Header"



const Home = ({match}) => {

    const [internment, setInternment] = useState({})
    const [myRef, setMyRef] = useState(null); 

    const [listItems, setListItems] = useState({
        friendList :  [
            {
                id: "1",
                name:"Luciano"
            },
            {
                id: "2",
                name:"lucas"
            },
            {
                id: "3",
                name:"mateo"
            },
            {
                id: "4",
                name:"perez"
            },
        ],
        listGuests: [
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
    })

    const moveFriend = (event) => {
        // event.preventDefault();
        // this.event.source
        console.log(event)
        let item= listItems[event.source.droppableId][event.source.index];
        console.log(listItems[event.source.droppableId]);
        listItems[event.source.droppableId].splice(event.source.index, 1);
        listItems[event.destination.droppableId].push(item);

        console.log(item)
        // this.listItems[event.source.droppableId]
    }

    const deleteFriend = async (friend, index, list) => {
        console.log(friend, index, list)
    }

    useEffect(() => { 
        // setMyRef(React.createRef();
    }, []);

    return (
        <>
            <Header></Header>
            <div class="container-fluid">
                <div class="row">
                    <DragDropContext onDragEnd={(event) => moveFriend(event)}>
                        {/* <Droppable droppableId="Lists"> */}
                            {/* { (droppableProvided) => ( */}
                                <>
                                        <div class="col-md-5 mt-5 ml-2">
                                            <Droppable droppableId="friendList">
                                                { (droppableProvided) => (
                                                <FriendList
                                                    props={droppableProvided.droppableProps}
                                                    ref={droppableProvided.innerRef}
                                                    friendList={listItems.friendList}
                                                    deleteFriend={deleteFriend}
                                                    listId="friendList"
                                                ></FriendList>
                                                )}
                                            </Droppable>
                                        </div>
                                        <div class="col-md-5 mt-5">
                                            <Droppable droppableId="listGuests">
                                                { (droppableProvided) => (
                                                <FriendList
                                                    props={droppableProvided.droppableProps}
                                                    ref={droppableProvided.innerRef}
                                                    friendList={listItems.listGuests}
                                                    deleteFriend={deleteFriend}
                                                    listId="listGuests"
                                                ></FriendList>
                                                )}
                                            </Droppable>
                                        </div>
                                </>
                            {/* } */}
                        {/* </Droppable> */}
                    </DragDropContext>
                    
                </div>
            </div>
        </>
    );

}

export default Home