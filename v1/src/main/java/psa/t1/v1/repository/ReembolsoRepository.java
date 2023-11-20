package psa.t1.v1.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import psa.t1.v1.models.Reembolso;

public interface ReembolsoRepository extends MongoRepository<Reembolso, String>{

    @Query("{'estado': 'Aprovado'}")
    List<Reembolso> countByStatusAprovado();

    @Query("{'estado': 'Reprovado'}")
    List<Reembolso> countByStatusReprovado();

    default long sumAprovados(){
        return countByStatusAprovado().stream()
            .mapToLong(entidade -> entidade.getValor())
            .sum();
    }

    default long sumReprovados(){
        return countByStatusReprovado().stream()
            .mapToLong(entidade -> entidade.getValor())
            .sum();
    }
}
