package psa.t1.v1.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Data {
    private String dia;
    private String mes;
    private String ano;
    public int compareTo(Data dataFim) {
        return 0;
    }
}
