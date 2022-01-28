package FriendsStore.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import FriendsStore.entities.BirthDay;

public interface BirthDayRepository extends JpaRepository<BirthDay, Integer> {

	Optional<BirthDay> findByYear(int anio);

}
