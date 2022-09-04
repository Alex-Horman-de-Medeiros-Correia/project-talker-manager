const express = require('express');
const bodyParser = require('body-parser');
const { leitura, sendID } = require('./func');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const listando = await leitura();
  res.status(200).json(listando);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const lendo = await leitura();
  const hereId = await sendID(lendo, id);
  
  if (!hereId || hereId.length === 0) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(hereId);
});
