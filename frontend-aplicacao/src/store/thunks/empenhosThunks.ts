import { AppDispatch } from "..";
import axios from "axios";
import {
  addEmpenho,
  removeEmpenho,
  setEmpenhos,
  updateEmpenho,
} from "../slices/empenhosSlice";
import { Empenho } from "@/models/Empenho";

export const fetchEmpenhos = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<Empenho[]>(
      "http://localhost:8080/empenho"
    );
    dispatch(setEmpenhos(response.data));
  } catch (error) {
    console.error("Erro ao buscar empenhos:", error);
  }
};

export const criarEmpenho =
  (empenho: Empenho) => async (dispatch: AppDispatch) => {
    try {
      await axios.post("http://localhost:8080/empenho", empenho);
      dispatch(addEmpenho(empenho));
    } catch (error) {
      console.error("Erro ao criar empenho:", error);
    }
  };

export const editarEmpenho =
  (empenho: Empenho) => async (dispatch: AppDispatch) => {
    try {
      await axios.put(
        `http://localhost:8080/empenho/${empenho.numeroDoEmpenho}`,
        empenho
      );
      dispatch(updateEmpenho(empenho));
    } catch (error) {
      console.error("Erro ao editar empenho:", error);
    }
  };

export const excluirEmpenho = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.delete(`http://localhost:8080/empenho/${id}`);
    dispatch(removeEmpenho(id));
  } catch (error) {
    console.error("Erro ao excluir empenho:", error);
  }
};
