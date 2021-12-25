package com.example.demo.dao;

import com.example.demo.models.Usuarios;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UsuarioDaoImp implements  UsuarioDao{

    @Override
    public List<Usuarios> GetUsuarios() {
        return null;
    }
}
