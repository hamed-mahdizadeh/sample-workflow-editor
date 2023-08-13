export type SVGIconType = React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>;

export interface NodeData {  
    id: string;
    width: number;
    height: number;
    color: string;
    type: 'TYPE_A' | 'TYPE_B' | 'TYPE_C';
    title: string;
    text: string;
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
        width: 100,
        height: 100,
        color: '#f28b16',
        type: 'TYPE_A',
        title: 'Data Generator',
        text: 'Source'
    },
    {
        id: '0002',
        width: 100,
        height: 100,
        color: '#f6f15a',
        type: 'TYPE_B',
        title: 'Switch',
        text: 'Manipulator'
    },
    {
        id: '0003',
        width: 100,
        height: 100,
        color: '#2c840e',
        type: 'TYPE_C',
        title: 'Cluster Assigner',
        text: 'Predictor'
    }
];