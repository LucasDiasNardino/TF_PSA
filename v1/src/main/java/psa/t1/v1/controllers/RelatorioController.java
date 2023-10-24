package psa.t1.v1.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import psa.t1.v1.models.Reembolso;
import psa.t1.v1.models.RelatorioPeriodo;
import psa.t1.v1.repository.ReembolsoRepository;

@RestController
@RequestMapping("/relatorio")
public class RelatorioController {
    
    @Autowired
    private ReembolsoRepository reembolsoRepository;

    public ResponseEntity<Iterable<Reembolso>> buscaPorData(@RequestBody RelatorioPeriodo payload) {

        List<Reembolso> reembolsos = reembolsoRepository.findAll();

        

        return ResponseEntity.ok(reembolsoRepository.findAll());
    }
}
