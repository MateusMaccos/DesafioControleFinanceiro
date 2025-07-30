import { AppDispatch } from "..";
import axios from "axios";
import {
  addPagamento,
  removePagamento,
  setPagamentos,
  updatePagamento,
} from "../slices/pagamentosSlice";
import { Pagamento } from "@/models/Pagamento";

export const fetchPagamentos = () => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get<Pagamento[]>(
      "http://localhost:8080/pagamento"
    );
    dispatch(setPagamentos(response.data));
  } catch (error) {
    console.error("Erro ao buscar pagamentos:", error);
  }
};

export const criarPagamento =
  (pagamento: Pagamento) => async (dispatch: AppDispatch) => {
    try {
      await axios.post("http://localhost:8080/pagamento", pagamento);
      dispatch(addPagamento(pagamento));
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);
    }
  };

export const editarPagamento =
  (pagamento: Pagamento) => async (dispatch: AppDispatch) => {
    try {
      await axios.put(
        `http://localhost:8080/pagamento/${pagamento.numeroDoPagamento}`,
        pagamento
      );
      dispatch(updatePagamento(pagamento));
    } catch (error) {
      console.error("Erro ao editar pagamento:", error);
    }
  };

export const excluirPagamento =
  (id: string) => async (dispath: AppDispatch) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:8080/pagamento/${id}`);
      dispath(removePagamento(id));
    } catch (error) {
      console.error("Erro ao excluir pagamento:", error);
    }
  };
