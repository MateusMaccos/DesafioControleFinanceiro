"use client";

import { criarDespesa } from "@/controllers/despesaController";

import {
  excluirDespesa,
  fetchDespesas,
  adicionarDespesa,
  editarDespesa,
} from "@/store/thunks/despesasThunks";
import { useEffect, useState } from "react";
import { Input, Button, Select, DatePicker, Table, Space } from "antd";
import dayjs from "dayjs";

import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { addDespesa, removeDespesa } from "@/store/slices/despesasSlice";
import { AppDispatch, RootState } from "@/store";

export default function DespesaForm() {
  const [editando, setEditando] = useState(false);
  const [numeroProtocoloEditado, setNumeroProtocoloEditado] = useState<
    string | null
  >(null);
  const despesas = useSelector((state: RootState) => state.despesas.lista);
  const despesasArray = Array.isArray(despesas) ? despesas : [];
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState("");
  useEffect(() => {
    dispatch(fetchDespesas());
  }, []);
  const columns = [
    {
      title: "N° Protocolo",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
    },
    {
      title: "Data Protocolo",
      dataIndex: "dataProtocolo",
      key: "dataProtocolo",
    },
    {
      title: "Data Vencimento",
      dataIndex: "dataVencimento",
      key: "dataVencimento",
    },
    {
      title: "Credor",
      dataIndex: "credor",
      key: "credor",
    },
    {
      title: "Descrição",
      dataIndex: "descricao",
      key: "descricao",
    },
    {
      title: "Valor",
      dataIndex: "valor",
      key: "valor",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Ações",
      dataIndex: "acoes",
      render: (_: any, record: { key: string }) => (
        <Space>
          <a
            className="acoes"
            onClick={() => {
              const despesa = despesas.find(
                (despesa) => despesa.numeroDeProtocolo === record.key
              );
              if (!despesa) return;
              setTipo(despesa.tipoDeDespesa);
              setDataProtocolo(despesa.dataDoProtocolo);
              setDataVencimento(despesa.dataDeVencimento);
              setCredor(despesa.credor);
              setDescricao(despesa.descricao);
              setValor(despesa.valor.toString());
              setEditando(true);
              setNumeroProtocoloEditado(despesa.numeroDeProtocolo);
            }}
          >
            Editar
          </a>
          <a
            className="acoes"
            onClick={() => {
              dispatch(excluirDespesa(record.key));
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
    if (
      !tipo ||
      !dataProtocolo ||
      !dataVencimento ||
      !credor ||
      !descricao ||
      !valor
    ) {
      setError("Preencha todos os campos");
      return;
    }

    const despesaCriada = criarDespesa(
      numeroProtocoloEditado,
      tipo,
      Number(valor),
      credor,
      descricao,
      dataProtocolo,
      dataVencimento
    );
    if (editando && numeroProtocoloEditado) {
      dispatch(editarDespesa(despesaCriada));
    } else {
      dispatch(adicionarDespesa(despesaCriada));
    }

    setTipo("");
    setDataProtocolo("");
    setDataVencimento("");
    setCredor("");
    setDescricao("");
    setValor("");
    setError("");
    setEditando(false);
    setNumeroProtocoloEditado(null);
    dispatch(fetchDespesas());
  }

  const [tipo, setTipo] = useState("");
  const [dataProtocolo, setDataProtocolo] = useState("");
  const [dataVencimento, setDataVencimento] = useState("");
  const [credor, setCredor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  return (
    <div>
      <h1>{`${editando ? "Editar" : "Criar"} Despesa`}</h1>
      <form onSubmit={handleForm}>
        <Select
          showSearch
          className="campo-formulario"
          value={tipo === "" ? undefined : tipo}
          placeholder="Selecione o tipo"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          onChange={(e) => setTipo(e)}
          options={[
            {
              value: "OBRA_DE_EDIFICACAO",
              label: "Obra de Edificação",
            },
            {
              value: "OBRA_DE_RODOVIA",
              label: "Obra de Rodovia",
            },
            {
              value: "OUTROS",
              label: "Outros",
            },
          ]}
        />
        <DatePicker
          placeholder="Data do Protocolo"
          className="campo-formulario"
          format="DD/MM/YYYY"
          value={
            dataProtocolo === ""
              ? undefined
              : dayjs(dataProtocolo, "DD/MM/YYYY")
          }
          onChange={(e) =>
            setDataProtocolo(`${dayjs(e, "DD/MM/YYYY").format("DD/MM/YYYY")}`)
          }
        />
        <DatePicker
          placeholder="Data do Vencimento"
          className="campo-formulario"
          format="DD/MM/YYYY"
          value={
            dataVencimento === ""
              ? undefined
              : dayjs(dataVencimento, "DD/MM/YYYY")
          }
          onChange={(e) =>
            setDataVencimento(`${dayjs(e, "DD/MM/YYYY").format("DD/MM/YYYY")}`)
          }
        />
        <Input
          type="text"
          className="campo-formulario"
          value={credor}
          placeholder="Credor"
          onChange={(e) => setCredor(e.target.value)}
        />

        <Input
          type="text"
          className="campo-formulario"
          value={descricao}
          placeholder="Descrição"
          onChange={(e) => setDescricao(e.target.value)}
        />

        <Input
          type="text"
          className="campo-formulario"
          value={valor}
          placeholder="R$"
          onChange={(e) => setValor(e.target.value.replace(",", "."))}
        />
        <p className="error">{error}</p>
        <Button type="primary" htmlType="submit">
          {editando ? "Editar" : "Criar"}
        </Button>
      </form>

      <div className="tabela-despesas">
        <h2>Despesas</h2>

        {despesas.length > 0 ? (
          <Table
            columns={columns}
            dataSource={despesasArray.map((despesa) => {
              return {
                key: despesa.numeroDeProtocolo,
                tipo: despesa.tipoDeDespesa,
                dataProtocolo: despesa.dataDoProtocolo,
                dataVencimento: despesa.dataDeVencimento,
                credor: despesa.credor,
                valor: `R$ ${despesa.valor.toFixed(2).replace(".", ",")}`,
                descricao: despesa.descricao,
                status: despesa.status,
              };
            })}
          ></Table>
        ) : (
          <p>Nenhuma despesa cadastrada</p>
        )}
      </div>
    </div>
  );
}
