"use client";

import DespesaForm from "@/views/despesas/DespesaForm";
import PagamentosForm from "@/views/pagamentos/PagamentoForm";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import "./styles.css";
import EmpenhoForm from "@/views/Empenhos/EmpenhoForm";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function Home() {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Despesas`,
      children: <DespesaForm />,
    },
    {
      key: "2",
      label: `Pagamentos`,
      children: <PagamentosForm />,
    },
    {
      key: "3",
      label: `Empenhos`,
      children: <EmpenhoForm />,
    },
  ];
  return (
    <Provider store={store}>
      <Tabs defaultActiveKey="1" items={items} />
    </Provider>
  );
}
