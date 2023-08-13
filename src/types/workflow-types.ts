export interface NodeData {
    type: string;
    id: string;
    width: number;
    height: number;
    color: string;
}

export interface NodeInstanceData extends NodeData {
    coordinates: {
        x: number;
        y: number;
    }
    nodeTypeId: string;
}

export const DUMMY_NODES: NodeData[] = [
    {
        id: '0001',
        type: 'Type A',
        width: 100,
        height: 100,
        color: '#dfda41',
    },
    {
        id: '0002',
        type: 'Type B',
        width: 100,
        height: 100,
        color: '#38d235',
    },
    {
        id: '0003',
        type: 'Type C',
        width: 100,
        height: 100,
        color: '#35d2d0',
    },
    {
        id: '0004',
        type: 'Type D',
        width: 100,
        height: 100,
        color: '#e8d20a',
    }
];