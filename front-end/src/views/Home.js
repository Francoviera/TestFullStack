import React, { useEffect, useState } from 'react'
// import { Redirect } from "react-router"
import FriendList from "../components/listFriends"
import ModalFriend from "../components/ModalFriend"

import {DragDropContext, Droppable, } from "react-beautiful-dnd"

import Header from "../components/Header"



const Home = ({match}) => {

    const [internment, setInternment] = useState({})
    const [myRef, setMyRef] = useState(null); 

    const [friendSelected, setFriendSelected] = useState(null); 
    const [birthday, setBirthDay] = useState(null); 

    const [isModalFriend, setIsModalFriend] = useState(false); 

    const [loading, setLoading] = useState(false); 



    const [listItems, setListItems] = useState({
        friendList :  [],
        listGuests: []
    })
    useEffect(  () => { 
        console.log("LISTADO", listItems)
    }, [listItems]);

    useEffect( async () => { 

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: 'follow',
        };
        let anio=  new Date().getFullYear();
        await fetch(process.env.REACT_APP_BE_URL + '/birthday/anio/'+anio, requestOptions)
          .then(res => res.json())
          .then(birthday => {
            fetch(process.env.REACT_APP_BE_URL + '/friends', requestOptions)
            .then(res => res.json())
            .then(json => {
                console.log("CUMPLEAÑOS", birthday)
                let result= [];
                if(birthday?.friends?.length > 0) {
                    json.map(friend => {
                        if(!birthday.friends.find((item) => friend.id === item.id)){
                            result.push(friend);
                        }
                    })
                }else{ 
                    result= json
                }
                setBirthDay(birthday);
                setListItems({listGuests: birthday?.friends ? birthday.friends : [], friendList: result})
                setLoading(false);
              })
        }) 
        console.log("LISTADO", listItems)
    }, []);

    const submit = async () => {
        setLoading(true);

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let obj= {
            year: new Date().getFullYear(),
            friends: listItems.listGuests
        }
        if(birthday?.friends){
            obj.id= birthday.id;
        }
        let data= JSON.stringify(obj);

        let requestOptions = {
            method: birthday ? "PUT" : "POST",
            headers: myHeaders,
            redirect: 'follow',
            body: data,
        };
        console.log(data)
        await fetch(process.env.REACT_APP_BE_URL + '/birthday', requestOptions)
          .then(res => res.json())
          .then(json => {
              console.log(json)
            setLoading(false);
            let msj= birthday?.friends ? "Lista Actualizada" : "Lista Creada";
            alert(msj)
            // window.location.reload();
          })
    }

    const moveFriend = (event) => {

        if(event.source.droppableId && event.destination.droppableId){
            let item= listItems[event.source.droppableId][event.source.index];
            listItems[event.source.droppableId].splice(event.source.index, 1);
            listItems[event.destination.droppableId].push(item);

        }else{
            alert("No suelte el elemento fuera del rango");
        }
    }

    const deleteFriend = async (friend, index, list) => {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: 'follow',
        };
        console.log(friend)
        console.log(list)

        console.log(index)
        await fetch(process.env.REACT_APP_BE_URL + '/friends/'+friend.id, requestOptions)
          .then(res => res.json())
          .then(json => {  
                let friends= listItems[list];
                friends[index].active= false;
                setListItems({...listItems, friendList: friends});
                alert("Amigo borrado");
        })
    }

    const handleClick = () => {
        setIsModalFriend(isModalFriend ? false : true);
        setFriendSelected(false);
    }

    const editFriend = async (friend, index, list) => {
        setFriendSelected({
            friend: friend,
            index: index,
            list: list        });
        setIsModalFriend(true);
    }

    useEffect(() => { 
        // setMyRef(React.createRef();
    }, []);

    return (
        <>
            { loading ?
                "Loading..."
                
                : 
                <div class="container">
                    <div class="row">
                        <div class="col-md-3">
                            <button class="btn btn-primary mt-4 ml-5" onClick={ () => handleClick() }>
                                { isModalFriend ?
                                    "Volver"  
                                : <span>Amigo <i class="fas fa-user-plus ml-4 text-ligth"></i></span>
                            }
                            </button>
                        </div>
                        <div class="col-md-9 mt-4">
                            <h2>Invitaciones a Cumpleaños { new Date().getFullYear()}</h2>
                        </div>
                    </div>
                    {   isModalFriend ?
                            <ModalFriend 
                                data= {friendSelected}
                            ></ModalFriend>
                        :
                            <>
                                <div class="row">
                                    <DragDropContext onDragEnd={(event) => moveFriend(event)}>
                                        {/* <Droppable droppableId="Lists"> */}
                                            {/* { (droppableProvided) => ( */}
                                                <>
                                                        <div class="col-md-6 mt-5 margin-auto">
                                                            <Droppable droppableId="friendList">
                                                                { (droppableProvided) => (
                                                                <FriendList
                                                                    props={droppableProvided.droppableProps}
                                                                    ref={droppableProvided.innerRef}
                                                                    friendList={listItems.friendList}
                                                                    deleteFriend={deleteFriend}
                                                                    editFriend={editFriend}
                                                                    listId="friendList"
                                                                ></FriendList>
                                                                )}
                                                            </Droppable>
                                                        </div>
                                                        <div class="col-md-6 mt-5 margin-auto">
                                                            <Droppable droppableId="listGuests">
                                                                { (droppableProvided) => (
                                                                <FriendList
                                                                    props={droppableProvided.droppableProps}
                                                                    ref={droppableProvided.innerRef}
                                                                    friendList={listItems.listGuests}
                                                                    deleteFriend={deleteFriend}
                                                                    editFriend={editFriend}
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
                                <div class="row">
                                    <div class="col-md-2 margin-auto">
                                        <button class="btn btn-success mt-5" onClick={() => submit()}>{birthday?.friends ? "Actualizar Invitados" : "Invitar amigos"}</button>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            }
        </>
    );

}

export default Home