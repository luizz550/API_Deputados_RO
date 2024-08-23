const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Função para ler os dados dos parlamentares
const getParlamentaresData = () => {
  const dataPath = path.join(__dirname, 'data', 'parlamentares.json');
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
};

// Função para ler os detalhes dos parlamentares
const getParlamentaresDetalhesData = () => {
  const detalhesPath = path.join(__dirname, 'data', 'parlamentares_detalhes.json');
  const rawData = fs.readFileSync(detalhesPath);
  return JSON.parse(rawData);
};

// Rota para retornar a lista de parlamentares
app.get('/api/parlamentares', (req, res) => {
  try {
    const data = getParlamentaresData();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar dados');
  }
});

// Rota para retornar os detalhes de um parlamentar específico
app.get('/api/parlamentares/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const detalhesData = getParlamentaresDetalhesData();
    const parlamentar = detalhesData.parlamentares_detalhes.find(p => p.id === id);
    if (parlamentar) {
      res.json(parlamentar);
    } else {
      res.status(404).send('Parlamentar não encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar detalhes');
  }
});

// Altere para usar o IP local da sua máquina
const ip = '192.168.3.35'; // Substitua pelo IP da sua máquina local
app.listen(port, ip, () => {
  console.log(`Servidor rodando em http://${ip}:${port}/api/parlamentares`);
});
