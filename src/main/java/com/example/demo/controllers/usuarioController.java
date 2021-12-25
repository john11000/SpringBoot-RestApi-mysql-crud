package com.example.demo.controllers;

import com.example.demo.models.Usuarios;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class usuarioController {

    @RequestMapping(value = "usuario")
    public List<Usuarios> getUsuario(){
        List<Usuarios> listaUsuarios  = new ArrayList<Usuarios>();
        Usuarios usuario  = new Usuarios();
        usuario.setNombre("usuario 0");

        Usuarios usuario1  = new Usuarios();
        usuario1.setNombre("usuario 1");

        Usuarios usuario2  = new Usuarios();
        usuario2.setNombre("usuario 2");

        listaUsuarios.add(usuario);
        listaUsuarios.add(usuario1);
        listaUsuarios.add(usuario2);

        return listaUsuarios;
    }
    @RequestMapping(value = "usuario/{nombre}")
    public Usuarios PutUsuario(@PathVariable String nombre){
        Usuarios usuario  = new Usuarios();
        usuario.setNombre(nombre);
        return usuario;
    }
    @RequestMapping(value = "home")
    public String home(){
        return "Main page";
    }
}
