import { NodeData, NodeInstanceData } from './../types/workflow-types';
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';
import { AppDispatch, GetState } from '.';

const initialState: {
    nodes: NodeInstanceData[];
    placeHolderBoundedItem: NodeData | null;
    notifications: { id: string, message: string, type: 'error' | 'info' }[]
} = {
    nodes: [],
    placeHolderBoundedItem: null,
    notifications: []
}

const dummyPostCall = async (node: NodeInstanceData) => {
    console.info("Synced with server!");
    return Promise.resolve(true);
}

const workflowSlice = createSlice({
    name: "workflow",
    initialState,
    reducers: {
        addNewNode(state, action: { payload: NodeInstanceData }) {
            if (state.placeHolderBoundedItem) {
                state.nodes.push(action.payload);
            }
        },
        removeNode(state, action: { payload: string }) {
            state.nodes = state.nodes.filter(n => n.id === action.payload);
        },
        bindPlaceHolder(state, action: { payload: NodeData }) {
            state.placeHolderBoundedItem = action.payload;
        },
        unbindPlaceHolder(state) {
            state.placeHolderBoundedItem = null;
        },
        addNotifications(state, action: { payload: { message: string, type: 'error' | 'info' } }) {
            state.notifications.push({
                id: uuid(),
                ...action.payload
            });
        },
        removeNotification(state, action: { payload: string }) {
            state.notifications = state.notifications.filter(n => n.id === action.payload);
        }
    }
});

const addNode = ({ x, y }: { x: number, y: number }) => async (dispatch: AppDispatch, getState: GetState) => {
    const nodeData = getState().workflow.placeHolderBoundedItem;
    if (nodeData) {
        const newNodeInstance = {
            ...nodeData,
            id: uuid(),
            coordinates: {
                x,
                y
            },
            nodeTypeId: nodeData.id
        };
        const result = await dummyPostCall(newNodeInstance);
        if (result) {
            dispatch(workflowSlice.actions.addNewNode(newNodeInstance))
        } else {
            dispatch(
                workflowSlice.actions.addNotifications(
                    {
                        message: 'Sync with Server failed. No node added!',
                        type: 'error'
                    }
                )
            );
        }
    } else {
        dispatch(
            workflowSlice.actions.addNotifications(
                {
                    message: 'No node added! Please try again',
                    type: 'error'
                }
            )
        );
    }
    workflowSlice.actions.unbindPlaceHolder();
}


export const workflowActions = {
    ...workflowSlice.actions,
    addNode
}

export default workflowSlice;