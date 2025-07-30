import { Empenho } from "./Empenho";

export interface Pagamento {
  numeroDoPagamento: string;
  dataPagamento: string;
  valorPagamento: number;
  observacao: string;
  empenho: Empenho;
  numeroDoEmpenho?: string;
}
