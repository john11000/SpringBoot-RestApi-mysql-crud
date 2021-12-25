package com.second.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.second.models.ProductoModel;

public interface ProductoDao extends JpaRepository<ProductoModel, Integer> {

}
