package psa.t1.v1.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
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
        
        LocalDate dataInicio = payload.getDataInicio();
        LocalDate dataFim = payload.getDataFim();

        for (Reembolso reembolso : reembolsos) {
            LocalDate dataReembolso = reembolso.getData();

            if(dataInicio == null) {
                dataInicio = LocalDate.of(1900, 1, 1);
            }

            if(dataFim == null) {
                dataFim = LocalDate.of(2100, 1, 1);
            }            
            
            if (dataReembolso.isBefore(dataInicio) || dataReembolso.isAfter(dataFim)) {
                reembolsos.remove(reembolso);
            }
        }


        return ResponseEntity.ok(reembolsos);
    }
}
