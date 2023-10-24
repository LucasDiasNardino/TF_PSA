package psa.t1.v1.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RelatorioPeriodo {
    
    private Data dataInicio;
    private Data dataFim;
}
