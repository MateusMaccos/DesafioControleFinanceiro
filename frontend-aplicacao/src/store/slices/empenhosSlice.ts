import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Empenho } from "@/models/Empenho";

interface EmpenhosState {
  lista: Empenho[];
}

const initialState: EmpenhosState = {
  lista: [],
};

const empenhosSlice = createSlice({
  name: "empenhos",
  initialState,
  reducers: {
    setEmpenhos(state, action: PayloadAction<Empenho[]>) {
      state.lista = action.payload;
    },
    addEmpenho(state, action: PayloadAction<Empenho>) {
      state.lista.push(action.payload);
    },
    updateEmpenho(state, action: PayloadAction<Empenho>) {
      const index = state.lista.findIndex(
        (empenho) => empenho.numeroDoEmpenho === action.payload.numeroDoEmpenho
      );
      if (index !== -1) {
        state.lista[index] = action.payload;
      }
    },
    removeEmpenho(state, action: PayloadAction<string>) {
      state.lista = state.lista.filter(
        (empenho) => empenho.numeroDoEmpenho !== action.payload
      );
    },
  },
});

export const { setEmpenhos, addEmpenho, removeEmpenho, updateEmpenho } =
  empenhosSlice.actions;
export default empenhosSlice.reducer;
