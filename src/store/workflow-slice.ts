import { NodeData, NodeInstanceData } from './../types/workflow-types';
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
    nodes: NodeInstanceData[];
    placeHolderBoundedItem: NodeData | null;
} = {
    nodes: [],
    placeHolderBoundedItem: null
}

const workflowSlice = createSlice({
    name: "workflow",
    initialState,
    reducers: {
        bindPlaceHolder(state, action: { payload: NodeData }) {
            state.placeHolderBoundedItem = action.payload;
        },
        unbindPlaceHolder(state) {
            state.placeHolderBoundedItem = null;
        }
    }
});

export const workflowActions = workflowSlice.actions;

export default workflowSlice;