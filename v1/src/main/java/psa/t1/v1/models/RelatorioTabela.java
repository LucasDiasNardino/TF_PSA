package psa.t1.v1.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RelatorioTabela {
    // quantidade, porcentagem e  valor  total dos  pedidos  aprovados  e  dos pedidos  negados em  um período    
    private long quantidadePedidosAprovados;
    private long quantidadePedidosNegados;
    private long valorTotalPedidosAprovados;
    private long valorTotalPedidosNegados;
    private double porcentagemPedidosAprovados;
    private double porcentagemPedidosNegados;
}
