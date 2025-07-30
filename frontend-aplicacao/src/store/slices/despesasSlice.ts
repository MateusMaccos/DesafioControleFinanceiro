import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Despesa } from "../../models/Despesa";
interface DespesasState {
  lista: Despesa[];
}

const initialState: DespesasState = {
  lista: [],
};

const despesasSlice = createSlice({
  name: "despesas",
  initialState,
  reducers: {
    setDespesas(state, action: PayloadAction<Despesa[]>) {
      state.lista = action.payload;
    },
    addDespesa(state, action: PayloadAction<Despesa>) {
      state.lista.push(action.payload);
    },
    updateDespesa(state, action: PayloadAction<Despesa>) {
      const index = state.lista.findIndex(
        (despesa) =>
          despesa.numeroDeProtocolo === action.payload.numeroDeProtocolo
      );
      if (index !== -1) {
        state.lista[index] = action.payload;
      }
    },
    removeDespesa(state, action: PayloadAction<string>) {
      state.lista = state.lista.filter(
        (despesa) => despesa.numeroDeProtocolo !== action.payload
      );
    },
  },
});

export const { setDespesas, addDespesa, removeDespesa, updateDespesa } =
  despesasSlice.actions;
export default despesasSlice.reducer;
