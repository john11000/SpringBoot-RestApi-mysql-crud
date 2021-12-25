package com.example.demo.controllers;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dos")
public class DosController {


	@RequestMapping("")
	public String getDosHome() {
		return "Main dos";
	}
	
	
	@RequestMapping("/")
	public String getDos() {
		return "Dos";
	}
	
	@RequestMapping("/name")
	public String getDosName() {
		return "Dos name";
	}
	
	@RequestMapping(value="/greet/{name}")
	public String getGreeting (@PathVariable String name) {
		return String.format("Hola %s. Bienvenido.", name);
	}
}
