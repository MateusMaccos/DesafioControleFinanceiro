import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pagamento } from "../../models/Pagamento";

interface PagamentosState {
  lista: Pagamento[];
}

const initialState: PagamentosState = {
  lista: [],
};

const pagamentosSlice = createSlice({
  name: "pagamentos",
  initialState,
  reducers: {
    setPagamentos(state, action: PayloadAction<Pagamento[]>) {
      state.lista = action.payload;
    },
    addPagamento(state, action: PayloadAction<Pagamento>) {
      state.lista.push(action.payload);
    },
    updatePagamento(state, action: PayloadAction<Pagamento>) {
      const index = state.lista.findIndex(
        (pagamento) =>
          pagamento.numeroDoPagamento === action.payload.numeroDoPagamento
      );
      if (index !== -1) {
        state.lista[index] = action.payload;
      }
    },
    removePagamento(state, action: PayloadAction<string>) {
      state.lista = state.lista.filter(
        (pagamento) => pagamento.numeroDoPagamento !== action.payload
      );
    },
  },
});

export const { addPagamento, setPagamentos, removePagamento, updatePagamento } =
  pagamentosSlice.actions;
export default pagamentosSlice.reducer;
