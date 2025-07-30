import { Empenho } from "./Empenho";

export interface Despesa {
  numeroDeProtocolo: string;
  tipoDeDespesa: "OBRA_DE_EDIFICACAO" | "OBRA_DE_RODOVIA" | "OUTROS";
  dataDoProtocolo: string;
  dataDeVencimento: string;
  credor: string;
  descricao: string;
  valor: number;
  status?:
    | "AGUARDANDO_EMPENHO"
    | "PARCIALMENTE_EMPENHADA"
    | "AGUARDANDO_PAGAMENTO"
    | "PARCIALMENTE_PAGA"
    | "PAGA";
  empenhos?: Empenho[];
}
