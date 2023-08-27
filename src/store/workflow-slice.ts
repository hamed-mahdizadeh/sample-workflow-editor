import { ConnectionData, NodeData, NodeInstanceData } from './../types/workflow-types';
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';
import { AppDispatch, GetState } from '.';

const initialState: {
    nodes: {[key:string] : NodeInstanceData};
    connections: {[key: string] : ConnectionData};
    placeHolderBoundedItem: NodeData | null;
    connectionBoundedSourceItem: NodeInstanceData | null,
    notifications: { id: string, message: string, type: 'error' | 'info' }[]
} = {
    nodes: {},
    connections: {},
    placeHolderBoundedItem: null,
    notifications: [],
    connectionBoundedSourceItem: null,  
}

const dummyPostCall = async (node: NodeInstanceData) => {
    console.info("Synced with server!");
    return Promise.resolve(true);
}

const workflowSlice = createSlice({
    name: "workflow",
    initialState,
    reducers: {
        addUpdateNode(state, action: { payload: NodeInstanceData }) {
            state.nodes[action.payload.id] = action.payload;
        },
        removeNode(state, action: { payload: string }) {
            delete state.nodes[action.payload];
        },
        bindPlaceHolder(state, action: { payload: NodeData }) {
            state.placeHolderBoundedItem = action.payload;
        },
        unbindPlaceHolder(state) {
            state.placeHolderBoundedItem = null;
        },
        bindConnectionSource(state, action: {
            payload: NodeInstanceData
        }) {
            state.connectionBoundedSourceItem = action.payload
        },
        unbindConnectionSource(state) {
            state.connectionBoundedSourceItem = null;
        },
        addNotifications(state, action: { payload: { message: string, type: 'error' | 'info' } }) {
            state.notifications.push({
                id: uuid(),
                ...action.payload
            });
        },
        removeNotification(state, action: { payload: string }) {
            state.notifications = state.notifications.filter(n => n.id === action.payload);
        },
        addConnection(state, action: {payload: ConnectionData}) {
            state.connections[action.payload.id] = action.payload;
        },
        updateNodeCoordinate(state, action: { payload: {x: number, y: number, nodeId: string}}) {
            const {x, y} = action.payload;
            state.nodes[action.payload.nodeId].coordinates = {x, y};
        }
    }
});

const addNode = ({ x, y }: { x: number, y: number }) => async (dispatch: AppDispatch, getState: GetState) => {
    const nodeData = getState().workflow.placeHolderBoundedItem;
    if (nodeData) {
        const newNodeInstance: NodeInstanceData = {
            ...nodeData,
            id: uuid(),
            coordinates: {
                x,
                y
            },
            nodeTypeId: nodeData.id,
            connectionFrom: [],
            ConnectionTo: []
        };
        const result = await dummyPostCall(newNodeInstance);
        if (result) {
            dispatch(workflowSlice.actions.addUpdateNode(newNodeInstance))
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
    dispatch(workflowSlice.actions.unbindPlaceHolder());
}

const addConnection = (targetId: string ) => async (dispatch: AppDispatch, getState: GetState) => {
    const state = getState();
    const sourceId =  state.workflow.connectionBoundedSourceItem?.id;
    
    
    dispatch(workflowSlice.actions.unbindConnectionSource());
    if(sourceId) {
        const connectionId = uuid();
        const source: NodeInstanceData = { 
            ...state.workflow.nodes[sourceId],
            connectionFrom: [
                ...state.workflow.nodes[sourceId].connectionFrom,
                connectionId
            ]
        };
        
        const target: NodeInstanceData = { 
            ...state.workflow.nodes[targetId],
            connectionFrom: [
                ...state.workflow.nodes[targetId].connectionFrom,
                connectionId
            ]
        };
        dispatch(workflowSlice.actions.addUpdateNode(source));
        dispatch(workflowSlice.actions.addUpdateNode(target));
        
        const newConnection: ConnectionData = {
            sourceId,
            targetId,
            id: connectionId
        };
       dispatch(workflowSlice.actions.addConnection(newConnection));
    }
    
    
   
}


export const workflowActions = {
    ...workflowSlice.actions,
    addNode,
    addConnection
}

export default workflowSlice;