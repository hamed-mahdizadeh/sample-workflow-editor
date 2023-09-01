import {  rest } from 'msw'
import { DUMMY_NODES } from '../types/workflow-types';

export const searchNodesHandler = rest.post('/nodes', async (req, res, ctx) => {
  const data = await req.json();;
  if (data.searchTerm.trim() === '') {
    return res(
      ctx.status(200),
      ctx.json({
        nodes: DUMMY_NODES,
      }),
    );
}
const filteredNodesData = DUMMY_NODES.filter(node => node.type.toLowerCase().includes(data.searchTerm.toLowerCase()));
  return res(
    ctx.status(200),
    ctx.json({
      nodes: filteredNodesData,
    }),
  );
});

export const handlers = [
  searchNodesHandler,
]