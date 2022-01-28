package FriendsStore.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import FriendsStore.entities.BirthDay;
import FriendsStore.responses.RequestBirthDay;
import FriendsStore.services.BirthDayService;

import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "*", methods= {RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST, RequestMethod.DELETE})

@RestController
@RequestMapping("/birthday")
public class BirthDayController {

	@Autowired
	private BirthDayService birthDayService;

	@GetMapping("")
	public List<BirthDay> getAll() {
		return this.birthDayService.getAll();
	}
	
	@GetMapping("/anio/{anio}")
	public Optional<BirthDay> getBirthDay(@PathVariable("anio") int anio) {
		return this.birthDayService.getBirthDay(anio);
	}
	
	@PostMapping("")
	public ResponseEntity<BirthDay> save(@RequestBody BirthDay b) {
		Optional<BirthDay> birthDay= birthDayService.getBirthDay(b.getYear());
		if(!birthDay.isPresent()) {
			boolean ok = birthDayService.save(b);
			if (!ok) {
				return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
	
			} else {
				return new ResponseEntity<>(b, HttpStatus.OK);
			}
		}else {
			return new ResponseEntity<>(HttpStatus.IM_USED);
		}
	}
	
	@PutMapping("")
	public ResponseEntity<BirthDay> update(@RequestBody BirthDay b) {
		boolean ok = birthDayService.save(b);
		if (!ok) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);

		} else {
			return new ResponseEntity<>(b, HttpStatus.OK);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<BirthDay> delete(@PathVariable("id") int id) {
		Optional<BirthDay> birthDay = birthDayService.getBirthDay(id);
		if (birthDay.isPresent()) {
			birthDayService.delete(birthDay.get());
			return new ResponseEntity<BirthDay>(birthDay.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<BirthDay>(HttpStatus.NOT_FOUND);
		}
	}
	

}
