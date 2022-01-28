package FriendsStore.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import FriendsStore.entities.Friend;
import FriendsStore.repository.FriendRepository;


@Service
public class FriendsService {

	@Autowired
	private FriendRepository friends;

	/**
	 * Permite obtener un cliente mediante su id
	 * 
	 * @param id es el identificador unico de cada cliente, es un entero
	 * @return retorna un Optional de Cliente
	 */
	public Optional<Friend> getFriend(int id) {
		return this.friends.findById(id);
	}

	/**
	 * Permite obtener la lista de todos los clientes
	 * 
	 * @return retorna una lista de Cliente
	 */
	public List<Friend> getAll() {
		return this.friends.findAll();
	}

	/**
	 * Agrega un nuevo cliente
	 * 
	 * @param c una entidad Cliente
	 * @return retorna true si se agrego o false si no se pudo agregar
	 */
	public Boolean save(Friend f) {
		return this.friends.save(f) != null;
	}

	/**
	 * Elimina un cliente
	 * 
	 * @param c una entidad Cliente
	 */
	public void delete(Friend f) {
		f.setActive(false);
		this.friends.save(f);
	}

}
