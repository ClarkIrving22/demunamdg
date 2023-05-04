package com.mdg.demuna.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mdg.demuna.dao.PersonaDao;
import com.mdg.demuna.models.Persona;

@RestController
public class PersonaController {
    @Autowired//Hace que automaticamente la clase UsuarioDaoImp se importe y se cree un obj
    private PersonaDao personaDao;

    @RequestMapping(value = "api/personas", method = RequestMethod.GET)
    public List<Persona> getPersonas(){
        return personaDao.getPersonas();
    }
}
