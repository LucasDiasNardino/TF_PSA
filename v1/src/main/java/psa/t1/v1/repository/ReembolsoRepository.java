package psa.t1.v1.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import psa.t1.v1.models.Reembolso;

public interface ReembolsoRepository extends MongoRepository<Reembolso, String>{
    
}
