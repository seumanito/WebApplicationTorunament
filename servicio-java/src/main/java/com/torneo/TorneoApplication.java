package com.torneo;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@RestController
@RequestMapping("/jugadores")

public class TorneoApplication {
    private final JugadorRepository jugadorRepository;

    public TorneoApplication(JugadorRepository jugadorRepository) {
        this.jugadorRepository = jugadorRepository;
    }
    public static void main(String[] args) {
        SpringApplication.run(TorneoApplication.class, args);
    }

    @GetMapping 
    public List<Jugador> obtenerJugadores() {
        return jugadorRepository.findAll();
    }

    @PostMapping
    public Jugador crearJugador(@RequestBody Jugador jugador) {
        return jugadorRepository.save(jugador);
    }
}