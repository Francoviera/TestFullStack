package FriendsStore.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import FriendsStore.entities.Friend;
import FriendsStore.services.FriendsService;

import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", methods= {RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST, RequestMethod.DELETE})

@RestController
@RequestMapping("/friends")
public class FriendsController {

	@Autowired
	private FriendsService friendsService;

	@GetMapping("")
	public List<Friend> getAll() {
		return this.friendsService.getAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<Friend> get(@PathVariable("id") int id) {
		Optional<Friend> friend = friendsService.getFriend(id);
		if (!friend.isPresent()) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(friend.get(), HttpStatus.OK);
		}
	}

	@PostMapping("")
	public ResponseEntity<Friend> save(@RequestBody Friend f) {
		boolean ok = friendsService.save(f);
		if (!ok) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);

		} else {
			return new ResponseEntity<>(f, HttpStatus.OK);
		}
	}
	
	@PutMapping("")
	public ResponseEntity<Friend> update(@RequestBody Friend f) {
		boolean ok = friendsService.save(f);
		if (!ok) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);

		} else {
			return new ResponseEntity<>(f, HttpStatus.OK);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Friend> delete(@PathVariable("id") int id) {
		Optional<Friend> friend= friendsService.getFriend(id);
		if (friend.isPresent()) {
			friendsService.delete(friend.get());
			return new ResponseEntity<Friend>(friend.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<Friend>(HttpStatus.NOT_FOUND);
		}
	}
	

}
