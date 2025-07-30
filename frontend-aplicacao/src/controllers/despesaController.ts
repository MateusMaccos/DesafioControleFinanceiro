import { Despesa } from "@/models/Despesa";
function gerarNumeroComMascara(): string {
  const gerarDigitos = (quantidade: number): string =>
    Array.from({ length: quantidade }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

  const parte1 = gerarDigitos(5);
  const parte2 = gerarDigitos(6);
  const parte3 = gerarDigitos(4);
  const parte4 = gerarDigitos(2);

  return `${parte1}.${parte2}/${parte3}-${parte4}`;
}
export function criarDespesa(
  numeroDeProtocolo: string | null,
  tipo: string,
  valor: number,
  credor: string,
  descricao: string,
  dataProtocolo: string,
  dataVencimento: string
): Despesa {
  if (
    tipo !== "OBRA_DE_EDIFICACAO" &&
    tipo !== "OBRA_DE_RODOVIA" &&
    tipo !== "OUTROS"
  ) {
    throw new Error("Tipo de despesa inválido");
  }
  const despesa: Despesa = {
    numeroDeProtocolo: numeroDeProtocolo ?? gerarNumeroComMascara(),
    tipoDeDespesa: tipo,
    dataDoProtocolo: dataProtocolo,
    dataDeVencimento: dataVencimento,
    credor: credor,
    descricao: descricao,
    valor: valor,
    status: "AGUARDANDO_EMPENHO",
  };

  return despesa;
}
