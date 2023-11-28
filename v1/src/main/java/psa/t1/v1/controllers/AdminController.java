package psa.t1.v1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import psa.t1.v1.enums.Estado;
import psa.t1.v1.models.Reembolso;
import psa.t1.v1.repository.ReembolsoRepository;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/admin")
public class AdminController {
    
    @Autowired
    private ReembolsoRepository reembolsoRepository;

    @PostMapping("/aprovar/{id}")
    public ResponseEntity<String> aprovar(@PathVariable String id) {
        Reembolso reembolso = reembolsoRepository.findById(id).get();

        if(reembolso == null) {
            return ResponseEntity.badRequest().body("Reembolso não encontrado!");
        }

        if(reembolso.getEstado() != Estado.Pendente) {
            return ResponseEntity.badRequest().body("Reembolso não está pendente!");
        }

        reembolso.setEstado("Aprovado");
        reembolsoRepository.save(reembolso);

        return ResponseEntity.ok("Reembolso aprovado com sucesso!");
    }

    @PutMapping("/reprovar/{id}")
    public ResponseEntity<String> reprovar(@PathVariable String id, @RequestBody String motivoReprovacao) {
        Reembolso reembolso = reembolsoRepository.findById(id).get();

        if(reembolso == null) {
            return ResponseEntity.badRequest().body("Reembolso não encontrado!");
        }

        if(reembolso.getEstado() != Estado.Pendente) {
            return ResponseEntity.badRequest().body("Reembolso não está pendente!");
        }

        reembolso.setEstado("Reprovado");
        reembolso.setMotivoReprovacao(motivoReprovacao);
        reembolsoRepository.save(reembolso);

        return ResponseEntity.ok("Reembolso reprovado com sucesso!");
    }
}
