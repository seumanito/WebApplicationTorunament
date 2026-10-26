package com.torneo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "jugadores")
public class Jugador {

    @Id
    private String id;
    private String nombre;
    private String juego;
    public Jugador() {}
    public Jugador(String nombre, String juego) {
        this.nombre = nombre;
        this.juego = juego;
    }
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getJuego() { return juego; }
    public void setJuego(String juego) { this.juego = juego; }
}