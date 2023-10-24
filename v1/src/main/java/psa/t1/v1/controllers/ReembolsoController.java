package psa.t1.v1.controllers;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import psa.t1.v1.models.Reembolso;
import psa.t1.v1.repository.ReembolsoRepository;

@RestController
@RequestMapping("/reembolso")
public class ReembolsoController {

    @Autowired
    private ReembolsoRepository reembolsoRepository;
    
    @PostMapping("/cadastrar")
    public ResponseEntity<Reembolso> cadastrar(@RequestBody Reembolso payload) {

        reembolsoRepository.save(payload);

        return ResponseEntity.ok(payload);
    }

    @GetMapping("/listar")
    public ResponseEntity<Iterable<Reembolso>> listar() {

        Iterable<Reembolso> atividades = reembolsoRepository.findAll();

        return ResponseEntity.ok(atividades);
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Reembolso> buscar(@PathVariable String id) {

        Reembolso atividade = reembolsoRepository.findById(id).get();

        return ResponseEntity.ok(atividade);
    }

    @GetMapping("/deletar/{id}")
    public ResponseEntity<String> deletar(@PathVariable String id) {

        reembolsoRepository.deleteById(id);

        return ResponseEntity.ok("Deletado");
    }
}
