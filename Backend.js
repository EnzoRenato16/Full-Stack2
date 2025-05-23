const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let fila = []; // Estrutura da fila: { id, nome, perfil, status }

const prioridades = {
  vip: 1,
  prioritario: 2,
  comum: 3
};

function ordenarFila() {
  fila.sort((a, b) => prioridades[a.perfil] - prioridades[b.perfil]);
}

app.post('/entrar', (req, res) => {
  const { nome, perfil } = req.body;
  const novo = {
    id: Date.now(),
    nome,
    perfil,
    status: 'esperando'
  };
  fila.push(novo);
  ordenarFila();
  res.json({ msg: "Adicionado à fila", pessoa: novo });
});

app.get('/fila', (req, res) => {
  const comStatus = fila.map((pessoa, index) => ({
    ...pessoa,
    posicao: index + 1,
    semaforo:
      index === 0 ? 'verde' :
      index === 1 ? 'amarelo' : 'vermelho'
  }));
  res.json(comStatus);
});

app.post('/avancar', (req, res) => {
  fila.shift(); // Remove o primeiro da fila
  res.json({ msg: "Próximo!" });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor na porta ${PORT}`));
