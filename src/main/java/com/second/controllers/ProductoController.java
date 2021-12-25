package com.second.controllers;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.second.dao.ProductoDao;
import com.second.models.ProductoModel;

@RestController
public class ProductoController {

	@Autowired
	private ProductoDao productoDao;
	
/*	@GetMapping("/producto/{id}")
	public ProductoModel getProductosById(@PathVariable ProductoModel producto) {
		return productoDao.findById(producto.getId());
	}
*/
	
	@GetMapping("/producto")
	public List<ProductoModel> getProductos() {
		return productoDao.findAll();
	}
	@PostMapping("/producto")
	public List<ProductoModel> SaveProduct (@RequestBody ProductoModel producto) {		
	    productoDao.save(producto);
	    return productoDao.findAll();
		
	}
	
	@PutMapping("/producto")
	public List<ProductoModel> PutProduct (@RequestBody ProductoModel producto) {		
	    productoDao.save(producto);
	    return productoDao.findAll();
		
	}
	
	@DeleteMapping("/producto")
	public List<ProductoModel> DeleteProduct (@RequestBody ProductoModel producto) {		
	    productoDao.deleteById(producto.getId());
	    return productoDao.findAll();
		
	}
	
	
	
	
	/*
	@PostMapping("/producto/p")
	public String SaveProductos ()  {
		//productoDao.save(producto);
		return "producto";
	}
	*/
}
