export interface NodeData {
    type: string;
    id: string;
    width: number;
    height: number;
}

export interface NodeInstanceData extends NodeData {
    coordinates: {
        x: number;
        y: number;
    }
}

export const DUMMY_NODES: NodeData[] = [
    {
        id: '0001',
        type: 'Type A',
        width: 100,
        height: 100,
    },
    {
        id: '0002',
        type: 'Type B',
        width: 100,
        height: 100,
    },
    {
        id: '0003',
        type: 'Type C',
        width: 100,
        height: 100,
    },
    {
        id: '0004',
        type: 'Type D',
        width: 100,
        height: 100,
    }
];