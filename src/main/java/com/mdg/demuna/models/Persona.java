package com.mdg.demuna.models;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "persona")
public class Persona {
    /*ID autoincrementable
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter @Column(name = "id")
    private int id;*/
    @Id
    @Getter @Setter @Column(name = "dni")
    private String dni;

    @Getter @Setter @Column(name = "apellidopaterno")
    private String apellidopaterno;

    @Getter @Setter @Column(name = "apellidomaterno")
    private String apellidomaterno;

    @Getter @Setter @Column(name = "nombres")
    private String nombres;

    @JsonFormat(pattern="dd MMM yyyy")
    @Getter @Setter @Column(name = "fechanac")
    private Date fechanac;

    @Getter @Setter @Column(name = "telefono")
    private String telefono;

    @Getter @Setter @Column(name = "direccion")
    private String direccion;
}
