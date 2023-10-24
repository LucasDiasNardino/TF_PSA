package psa.t1.v1.models;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import psa.t1.v1.enums.Estado;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document("reembolsos")
public class Reembolso {

    @Id
    private String id;

    private String descricao;
    private long valor;
    private LocalDate data;
    private Estado estado;
}
