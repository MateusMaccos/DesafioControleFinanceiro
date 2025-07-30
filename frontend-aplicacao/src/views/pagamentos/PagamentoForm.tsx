"use client";

import { Pagamento } from "@/models/Pagamento";
import { useEffect, useState } from "react";
import {
  Input,
  Button,
  Table,
  DatePicker,
  Space,
  DatePickerProps,
  AutoComplete,
} from "antd";
import "./styles.css";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { addPagamento, removePagamento } from "@/store/slices/pagamentosSlice";
import { AppDispatch, RootState } from "@/store";
import { Empenho } from "@/models/Empenho";
import {
  criarPagamento,
  editarPagamento,
  excluirPagamento,
  fetchPagamentos,
} from "@/store/thunks/pagamentosThunks";

export default function PagamentosForm() {
  const [editando, setEditando] = useState(false);
  const [numeroDoEmpenho, setNumeroDoEmpenho] = useState("");
  const [numeroPagamentoEditado, setNumeroPagamentoEditado] = useState<
    string | null
  >(null);
  const pagamentos = useSelector((state: RootState) => state.pagamentos.lista);
  const pagamentosArray = Array.isArray(pagamentos) ? pagamentos : [];
  const dispatch = useDispatch<AppDispatch>();
  const [dataPagamento, setDataPagamento] = useState("");
  const [valor, setValor] = useState("");
  const [observacao, setObservacao] = useState("");
  const [error, setError] = useState("");
  const empenhos = useSelector((state: RootState) => state.empenhos.lista);
  useEffect(() => {
    dispatch(fetchPagamentos());
  }, [dispatch]);
  const columns = [
    {
      title: "N°",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Data",
      dataIndex: "data",
      key: "data",
    },
    {
      title: "Valor",
      dataIndex: "valor",
      key: "valor",
    },
    {
      title: "Observação",
      dataIndex: "observacao",
      key: "observacao",
    },
    {
      title: "Empenho",
      dataIndex: "empenho",
      key: "empenho",
    },
    {
      title: "Ações",
      dataIndex: "acoes",
      render: (_: any, record: { key: string }) => (
        <Space>
          <a
            className="acoes"
            onClick={() => {
              const pagamento = pagamentos.find(
                (p) => p.numeroDoPagamento === record.key
              );
              if (!pagamento) return;
              setDataPagamento(pagamento.dataPagamento);
              setValor(pagamento.valorPagamento.toString());
              setObservacao(pagamento.observacao);
              setEditando(true);
              setNumeroDoEmpenho(pagamento.empenho.numeroDoEmpenho);
              setNumeroPagamentoEditado(pagamento.numeroDoPagamento);
            }}
          >
            Editar
          </a>
          <a
            className="acoes"
            onClick={() => {
              dispatch(excluirPagamento(record.key));
            }}
          >
            Excluir
          </a>
        </Space>
      ),
    },
  ];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!dataPagamento || !valor || !observacao) {
      setError("Preencha todos os campos");
      return;
    }
    const pagamentoNovo: Pagamento = {
      numeroDoPagamento:
        editando && numeroPagamentoEditado
          ? numeroPagamentoEditado
          : `2025NP${(pagamentos.length + 1).toString().padStart(4, "0")}`,
      dataPagamento: dataPagamento,
      valorPagamento: parseFloat(valor),
      observacao: observacao,
      empenho: empenhos.find(
        (empenho) => empenho.numeroDoEmpenho === numeroDoEmpenho
      ) as Empenho,
    };
    if (editando && numeroPagamentoEditado) {
      dispatch(editarPagamento(pagamentoNovo));
    } else {
      dispatch(criarPagamento(pagamentoNovo));
    }

    setDataPagamento("");
    setValor("");
    setObservacao("");
    setError("");
    setEditando(false);
    setNumeroPagamentoEditado(null);
    dispatch(fetchPagamentos());
  }
  return (
    <div>
      <h1>{`${editando ? "Editar" : "Criar"} Pagamento`}</h1>
      <form onSubmit={handleSubmit}>
        <DatePicker
          placeholder="Data do Pagamento"
          className="campo-formulario"
          format="DD/MM/YYYY"
          value={dataPagamento ? dayjs(dataPagamento, "DD/MM/YYYY") : null}
          onChange={(e) => setDataPagamento(e.format("DD/MM/YYYY"))}
        />

        <Input
          type="text"
          className="campo-formulario"
          value={valor.replace(".", ",")}
          placeholder="R$"
          onChange={(e) => setValor(e.target.value.replace(",", "."))}
        />
        <Input
          type="text"
          className="campo-formulario"
          value={observacao}
          placeholder="Observação"
          onChange={(e) => setObservacao(e.target.value)}
        />

        <AutoComplete
          value={numeroDoEmpenho}
          className="campo-formulario"
          options={empenhos.map((empenho) => ({
            value: empenho.numeroDoEmpenho,
          }))}
          placeholder="Empenho"
          onChange={(e) => setNumeroDoEmpenho(e)}
        />
        {error && <p className="error">{error}</p>}
        <Button type="primary" htmlType="submit">
          {editando ? "Editar" : "Criar"}
        </Button>
      </form>

      <div className="tabela-pagamentos">
        <h2>Pagamentos</h2>

        {pagamentos.length > 0 ? (
          <Table
            columns={columns}
            dataSource={pagamentosArray.map((pagamento: Pagamento) => {
              return {
                key: pagamento.numeroDoPagamento,
                data: pagamento.dataPagamento,
                valor: `R$ ${pagamento.valorPagamento
                  .toFixed(2)
                  .replace(".", ",")}`,
                observacao: pagamento.observacao,
                empenho: pagamento.numeroDoEmpenho,
              };
            })}
          ></Table>
        ) : (
          <p>Nenhum pagamento cadastrado</p>
        )}
      </div>
    </div>
  );
}
