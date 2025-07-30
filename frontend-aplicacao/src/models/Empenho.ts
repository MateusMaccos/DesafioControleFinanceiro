import { Despesa } from "./Despesa";
import { Pagamento } from "./Pagamento";

export interface Empenho {
  numeroDoEmpenho: string;
  dataDoEmpenho: string;
  valorDoEmpenho: number;
  observacao: string;
  despesa: Despesa;
  numeroDeProtocoloDaDespesa?: string;
  pagamentos?: Pagamento[];
}
