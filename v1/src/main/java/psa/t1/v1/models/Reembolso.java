package psa.t1.v1.models;

import java.util.Date;

import javax.persistence.GeneratedValue;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

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
    private Date data;
    private Estado estado;
}
