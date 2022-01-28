package FriendsStore.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.ManyToMany;


@Entity
@Table(name="BirthDays")
public class BirthDay {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id; 
	
	@ManyToMany
	@JoinColumn( name = "id")
	private List<Friend> friends; 

	@Column
	private int year; 

	public BirthDay() {
		super();
		// TODO Auto-generated constructor stub
	}

	public BirthDay(ArrayList<Friend> friends, int year) {
		super();
		this.friends = friends;
		this.year = year;
	}

	public List<Friend> getFriends() {
		return friends;
	}

	public void setFriends(ArrayList<Friend> friends) {
		this.friends = friends;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}
	public int getId() {
		return this.id;
	}

}
