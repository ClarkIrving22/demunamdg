package com.mdg.demuna.repository;

import java.util.List;
import com.mdg.demuna.dao.PersonaDao;
import com.mdg.demuna.models.Persona;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;//funciona readOnly=true
//import jakarta.transaction.Transactional;//no funciona readOnly=true

@Repository//Referencia a la conexion con la BD
@Transactional//Le da la funcionalidad a esta clase de poder armar las consultas de sql a la BD
public class PersonaDaoRepo implements PersonaDao{
    @PersistenceContext
    private EntityManager entityManager;//requiere dependencia spring-boot-starter-data-jpa y mysql-connector-java en el pom, sirve para hacer la conexion a la BD
    
    @Override
    @Transactional(readOnly=true)
    public List<Persona> getPersonas() {
        String query = "FROM Persona order by apellidopaterno asc";
        return entityManager.createQuery(query, Persona.class).getResultList();
    }
    
}
