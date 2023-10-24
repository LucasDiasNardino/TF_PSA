package psa.t1.v1.models;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RelatorioPeriodo {
    
    private LocalDate dataInicio;
    private LocalDate dataFim;
}
