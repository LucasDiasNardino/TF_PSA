package psa.t1.v1.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/buscaPorData")
    public ResponseEntity<Iterable<Reembolso>> buscaPorData(@RequestBody RelatorioPeriodo relatorioPeriodo) {
        
        List<Reembolso> reembolsos = reembolsoRepository.findAll();
        
        relatorioPeriodo.checkDates();

        LocalDate dataInicio = relatorioPeriodo.getDataInicio();
        LocalDate dataFim = relatorioPeriodo.getDataFim();

        if (dataInicio.isAfter(dataFim)) {
            return ResponseEntity.badRequest().build();
        }

        Iterator<Reembolso> iterator = reembolsos.iterator();
        while (iterator.hasNext()) {
            Reembolso reembolso = iterator.next();
            LocalDate dataReembolso = reembolso.getData();          
            
            if (dataReembolso.isBefore(dataInicio) || dataReembolso.isAfter(dataFim)) {
                iterator.remove();
            }
        }
        return ResponseEntity.ok(reembolsos);
    }
}
