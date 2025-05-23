
import { useState, useEffect } from 'react';

export default function App() {
  const [fila, setFila] = useState([]);
  const [nome, setNome] = useState('');
  const [perfil, setPerfil] = useState('comum');

  const fetchFila = async () => {
    const res = await fetch('http://localhost:3001/fila');
    const data = await res.json();
    setFila(data);
  };

  const entrarNaFila = async () => {
    await fetch('http://localhost:3001/entrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, perfil })
    });
    setNome('');
    fetchFila();
  };

  const avancarFila = async () => {
    await fetch('http://localhost:3001/avancar', { method: 'POST' });
    fetchFila();
  };

  useEffect(() => {
    fetchFila();
  }, []);

  const corSemaforo = (cor) => ({
    verde: 'bg-green-500',
    amarelo: 'bg-yellow-400',
    vermelho: 'bg-red-500'
  }[cor]);

  return (
    <div className="p-6 max-w-3xl mx-auto font-sans space-y-6">
      <h1 className="text-3xl font-bold">Controle de Fila de Evento</h1>

      <div className="space-y-2">
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          className="border px-4 py-2 rounded w-full"
        />
        <select
          value={perfil}
          onChange={(e) => setPerfil(e.target.value)}
          className="border px-4 py-2 rounded w-full"
        >
          <option value="comum">Comum</option>
          <option value="prioritario">Prioritário</option>
          <option value="vip">VIP</option>
        </select>
        <button
          onClick={entrarNaFila}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Entrar na fila
        </button>
      </div>

      <h2 className="text-xl font-semibold">Fila atual:</h2>
      <ul className="space-y-2">
        {fila.map((pessoa, i) => (
          <li
            key={pessoa.id}
            className={`p-4 rounded shadow flex justify-between items-center ${corSemaforo(pessoa.semaforo)}`}
          >
            <span>{i + 1}º - {pessoa.nome} ({pessoa.perfil})</span>
            <span className="text-white font-bold uppercase">{pessoa.semaforo}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={avancarFila}
        className="mt-6 bg-green-700 text-white px-6 py-3 rounded"
      >
        Avançar Fila
      </button>
    </div>
  );
}
