package FriendsStore.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import FriendsStore.entities.Friend;

public interface FriendRepository extends JpaRepository<Friend, Integer> {

}
