package FriendsStore.entities;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="Friends")
public class Friend {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id; 

	@Column
	private String nombre; 

	@Column
	private String apellido;
	
	@Column
	private Date fechaDeNacimiento;
	
	@Column
	private Boolean active;

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	@Column
	private int dni; 
	
	@ManyToMany
	@JoinColumn( name = "friends", nullable=true)
	private List<BirthDay> BirthDays; 

	public Friend() {
		super();
		// TODO Auto-generated constructor stub
		this.active= true;
	}

	public Friend(String nombre, String apellido, Date fechaDeNacimiento, int dni) {
		super();
		this.nombre = nombre;
		this.apellido = apellido;
		this.dni= dni;
		this.fechaDeNacimiento= fechaDeNacimiento;
		this.active= true;
	}

	public Date getFechaDeNacimiento() {
		return fechaDeNacimiento;
	}

	public void setFechaDeNacimiento(Date fechaDeNacimiento) {
		this.fechaDeNacimiento = fechaDeNacimiento;
	}


	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public void setDni(int dni) {
		this.dni = dni;
	}
	
	public int getDni() {
		return dni;
	}

	public int getId() {
		return id;
	}

	@Override
	public boolean equals(Object obj) {
		Friend c = (Friend) obj;
		return c.getDni() == this.getDni();
	}
}
