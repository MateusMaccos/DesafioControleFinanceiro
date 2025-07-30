"use client";
import { useEffect, useState } from "react";
import {
  Input,
  Button,
  DatePicker,
  AutoComplete,
  AutoCompleteProps,
  Table,
  Space,
} from "antd";
import { Despesa } from "@/models/Despesa";
import { Empenho } from "@/models/Empenho";
import "./styles.css";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { addEmpenho, removeEmpenho } from "@/store/slices/empenhosSlice";
import { AppDispatch, RootState } from "@/store";
import App from "next/app";
import {
  criarEmpenho,
  editarEmpenho,
  excluirEmpenho,
  fetchEmpenhos,
} from "@/store/thunks/empenhosThunks";

export default function EmpenhoForm() {
  const [editando, setEditando] = useState(false);
  const [numeroEmpenhoEditado, setNumeroEmpenhoEditado] = useState<
    string | null
  >(null);
  const empenhos = useSelector((state: RootState) => state.empenhos.lista);
  const empenhosArray = Array.isArray(empenhos) ? empenhos : [];
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState("");
  const [valor, setValor] = useState("");
  const [observacao, setObservacao] = useState("");
  const [error, setError] = useState("");
  const despesas = useSelector((state: RootState) => state.despesas.lista);
  const [protocoloDespesa, setProtocoloDespesa] = useState("");
  useEffect(() => {
    dispatch(fetchEmpenhos());
  }, []);
  const columns = [
    {
      title: "N° Empenho",
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
      title: "Despesa",
      dataIndex: "despesa",
      key: "despesa",
    },

    {
      title: "Ações",
      dataIndex: "acoes",
      render: (_: any, record: { key: string }) => (
        <Space>
          <a
            className="acoes"
            onClick={() => {
              const empenho = empenhos.find(
                (empenho) => empenho.numeroDoEmpenho === record.key
              );
              if (!empenho) return;
              setData(empenho.dataDoEmpenho);
              setValor(empenho.valorDoEmpenho.toString());
              setObservacao(empenho.observacao);
              setProtocoloDespesa(empenho.numeroDeProtocoloDaDespesa || "");
              setEditando(true);
              setNumeroEmpenhoEditado(empenho.numeroDoEmpenho);
            }}
          >
            Editar
          </a>
          <a
            className="acoes"
            onClick={() => {
              dispatch(excluirEmpenho(record.key));
            }}
          >
            Excluir
          </a>
        </Space>
      ),
    },
  ];

  function handleForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!data || !valor || !observacao || !protocoloDespesa) {
      setError("Preencha todos os campos");
      console.log(`${data} ${valor} ${observacao} ${protocoloDespesa}`);
      return;
    }
    const empenhoNovo: Empenho = {
      numeroDoEmpenho:
        editando && numeroEmpenhoEditado
          ? numeroEmpenhoEditado
          : `2025NE${(empenhos.length + 1).toString().padStart(4, "0")}`,
      dataDoEmpenho: data,
      valorDoEmpenho: parseFloat(valor),
      observacao,
      despesa: despesas.find(
        (despesa) => despesa.numeroDeProtocolo === protocoloDespesa
      ) as Despesa,
    };
    if (editando && numeroEmpenhoEditado) {
      dispatch(editarEmpenho(empenhoNovo));
    } else {
      dispatch(criarEmpenho(empenhoNovo));
    }
    setData("");
    setValor("");
    setObservacao("");
    setProtocoloDespesa("");
    setError("");
    setEditando(false);
    setNumeroEmpenhoEditado(null);
    dispatch(fetchEmpenhos());
  }

  return (
    <div>
      <h1>{`${editando ? "Editar" : "Criar"} Empenho`}</h1>
      <form onSubmit={handleForm}>
        <DatePicker
          placeholder="Data do Empenho"
          className="campo-formulario"
          format="DD/MM/YYYY"
          onChange={(date) => {
            if (date) {
              const dataFormatada = dayjs(date).format("DD/MM/YYYY");
              setData(dataFormatada);
            } else {
              setData("");
            }
          }}
          value={data ? dayjs(data, "DD/MM/YYYY") : null}
        />
        <Input
          type="text"
          className="campo-formulario"
          value={valor}
          placeholder="Valor"
          onChange={(e) => setValor(e.target.value.replace(",", "."))}
        />
        <Input
          type="text"
          className="campo-formulario"
          id="observacao"
          placeholder="Observação"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
        />

        <AutoComplete
          value={protocoloDespesa}
          className="campo-formulario"
          options={despesas.map((despesa) => ({
            value: despesa.numeroDeProtocolo,
          }))}
          placeholder="Despesa"
          onChange={(e) => setProtocoloDespesa(e)}
        />
        <p className="error">{error}</p>
        <Button type="primary" htmlType="submit">
          {editando ? "Editar" : "Criar"}
        </Button>
      </form>
      <div>
        <h2>Empenhos</h2>

        {empenhos.length > 0 ? (
          <Table
            columns={columns}
            dataSource={empenhosArray.map((empenho) => {
              return {
                key: empenho.numeroDoEmpenho,
                data: empenho.dataDoEmpenho,
                valor: `R$ ${empenho.valorDoEmpenho
                  .toFixed(2)
                  .replace(".", ",")}`,
                observacao: empenho.observacao,
                despesa: empenho.numeroDeProtocoloDaDespesa,
              };
            })}
          ></Table>
        ) : (
          <p>Nenhum empenho cadastrado</p>
        )}
      </div>
    </div>
  );
}
