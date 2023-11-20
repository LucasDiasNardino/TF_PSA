package psa.t1.v1.models;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import psa.t1.v1.repository.ReembolsoRepository;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RelatorioTabela {

    @JsonIgnore
    @Autowired
    private ReembolsoRepository reembolsoRepository;

    // quantidade, porcentagem e  valor  total dos  pedidos  aprovados  e  dos pedidos  negados em  um período    
    private long quantidadePedidosAprovados;
    private long quantidadePedidosNegados;
    private long valorTotalPedidosAprovados;
    private long valorTotalPedidosNegados;
    private double porcentagemPedidosAprovados;
    private double porcentagemPedidosNegados;

    public void fetch(){

        long qtdReembolsos = reembolsoRepository.count();

        /*
         * quantidades
         */
        this.setPorcentagemPedidosAprovados(reembolsoRepository.countByStatusAprovado().size());
        this.setPorcentagemPedidosNegados(reembolsoRepository.countByStatusReprovado().size());


        /*
         * porcentagens
         */

        this.setPorcentagemPedidosAprovados((double) reembolsoRepository.countByStatusAprovado().size() / qtdReembolsos);
        this.setPorcentagemPedidosNegados((double) reembolsoRepository.countByStatusReprovado().size() / qtdReembolsos);

        /*
         * valor total
         */

        this.setValorTotalPedidosAprovados(reembolsoRepository.sumAprovados());
        this.setValorTotalPedidosNegados(reembolsoRepository.sumReprovados());
    }
}
