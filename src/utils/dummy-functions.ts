import { DUMMY_NODES } from "../types/workflow-types";

export const dummyNodeFetch = async (searchTerm: string) => {
    if (searchTerm.trim() === '') {
        return Promise.resolve(DUMMY_NODES);
    }
    const filteredNodesData = DUMMY_NODES.filter(node => node.type.toLowerCase().includes(searchTerm.toLowerCase()));

    return Promise.resolve(filteredNodesData);
}