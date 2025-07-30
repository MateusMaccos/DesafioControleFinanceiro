import { AppDispatch } from "..";
import axios from "axios";
import {
  addDespesa,
  removeDespesa,
  setDespesas,
  updateDespesa,
} from "../slices/despesasSlice";
import { Despesa } from "../../models/Despesa";

export const fetchDespesas = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<Despesa[]>(
      "http://localhost:8080/despesa"
    );
    dispatch(setDespesas(response.data));
  } catch (error) {
    console.error("Erro ao buscar despesas:", error);
  }
};

export const adicionarDespesa =
  (despesa: Despesa) => async (dispatch: AppDispatch) => {
    try {
      await axios.post("http://localhost:8080/despesa", despesa);
      dispatch(addDespesa(despesa));
    } catch (error) {
      console.error("Erro ao criar despesa:", error);
    }
  };

export const editarDespesa =
  (despesa: Despesa) => async (dispatch: AppDispatch) => {
    try {
      await axios.put(`http://localhost:8080/despesa`, despesa);
      dispatch(updateDespesa(despesa));
    } catch (error) {
      console.error("Erro ao editar despesa:", error);
    }
  };

export const excluirDespesa = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete("http://localhost:8080/despesa", { data: { id } });
    dispatch(removeDespesa(id));
  } catch (error) {
    console.error("Erro ao excluir despesa:", error);
  }
};
