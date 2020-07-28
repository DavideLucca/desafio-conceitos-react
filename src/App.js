import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response);
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`repositories/${id}`);
    console.log(response);
    console.log(repositories);
    setRepositories([...repositories]);
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(proj => (
          <li key={proj.id}>
            {proj.title}

          <button onClick={() => handleRemoveRepository(proj.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
