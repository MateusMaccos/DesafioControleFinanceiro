import { configureStore } from "@reduxjs/toolkit";
import pagamentosReducer from "./slices/pagamentosSlice";
import empenhosReducer from "./slices/empenhosSlice";
import despesasReducer from "./slices/despesasSlice";

export const store = configureStore({
  reducer: {
    pagamentos: pagamentosReducer,
    empenhos: empenhosReducer,
    despesas: despesasReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
