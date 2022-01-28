package FriendsStore.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import FriendsStore.entities.BirthDay;
import FriendsStore.repository.BirthDayRepository;


@Service
public class BirthDayService {

	@Autowired
	private BirthDayRepository birthDay;

	/**
	 * Permite obtener un cliente mediante su id
	 * 
	 * @param id es el identificador unico de cada cliente, es un entero
	 * @return retorna un Optional de Cliente
	 */
	public Optional<BirthDay> getBirthDay(int anio) {
		return this.birthDay.findByYear(anio);
	}

	/**
	 * Permite obtener la lista de todos los clientes
	 * 
	 * @return retorna una lista de Cliente
	 */
	public List<BirthDay> getAll() {
		return this.birthDay.findAll();
	}

	/**
	 * Agrega un nuevo cliente
	 * 
	 * @param c una entidad Cliente
	 * @return retorna true si se agrego o false si no se pudo agregar
	 */
	public Boolean save(BirthDay b) {
		return this.birthDay.save(b) != null;
	}

	/**
	 * Elimina un cliente
	 * 
	 * @param c una entidad Cliente
	 */
	public void delete(BirthDay b) {
		this.birthDay.delete(b);
	}

}
