import { configureStore } from "@reduxjs/toolkit";
import workflowSlice from "./workflow-slice";

const store = configureStore({
    reducer: {
        workflow: workflowSlice.reducer
    }
});


export type RootState = ReturnType<typeof store.getState>;

export default store;