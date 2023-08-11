import React, { useEffect, useState } from 'react';
import './App.css';
import SearchNodes from './Components/SearchNodes/SearchNodes';
import { DUMMY_NODES, NodeData } from './types/workflow-types';

const dummyNodeFetch = async (searchTerm: string) => {
  if(searchTerm.trim() === '') {
    return Promise.resolve(DUMMY_NODES);
  }
  const filteredNodesData = DUMMY_NODES.filter(node => node.type.toLowerCase().includes(searchTerm.toLowerCase()));

  return Promise.resolve(filteredNodesData);
}

function App() {

  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchTermChangeHandler = (term: string) => {
    setSearchTerm(searchTerm);
  }

  useEffect(() => {
    const loadNodes = async () => {
      const filteredResults = await dummyNodeFetch(searchTerm);
      setNodes(filteredResults);
    }

    loadNodes();

  }, [searchTerm])

  

  return (
    <div className="App">
     <header>
        <h3>Workflow Designer</h3>
        <SearchNodes nodes={nodes} onChange={searchTermChangeHandler} debounce={500} />
     </header>
    </div>
  );
}

export default App;
