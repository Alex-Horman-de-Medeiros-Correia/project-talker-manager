const fs = require('fs').promises;
const crypto = require('crypto');

const lista = 'src/talker.json';

const leitura = async () => {
    try {
        const lendo = await fs.readFile(lista, 'utf-8');

        return JSON.parse(lendo);
    } catch (err) {
        return err.message;
    }
};

const sendID = async (lendo, id) => {
    try {
        const umFind = lendo.find((element) => element.id === parseInt(id, 10));

        return umFind;
    } catch (err) {
        return err.message;
    }
};

const geradorToken = () => crypto.randomBytes(8).toString('hex');

const palestrante = async (req, res) => {
    const { name, age, talk } = req.body;
      const palestra = await leitura();
      if (name && age && talk) {
        const novoPalestrante = {
          id: palestra.length + 1,
          name,
          age,
          talk,
        };
        palestra.push(novoPalestrante);
        await fs.writeFile(lista, JSON.stringify(palestra));
        return res.status(201).json(novoPalestrante);
      }
      return res.status(400).json({ message: 'Preencha todos os campos' });
  };

  const editPalestrante = async (req, res) => {
    const { name, age, talk } = req.body;
    const { watchedAt, rate } = talk;
    const { id } = req.params;
    const palestra = await leitura();
    const mudanca = palestra.findIndex((element) => element.id === Number(id));
    palestra[mudanca].name = name;
    palestra[mudanca].age = age;
    palestra[mudanca].talk.watchedAt = watchedAt;
    palestra[mudanca].talk.rate = rate;
  
    await fs.writeFile(lista, JSON.stringify(palestra));
    return res.status(200).json(palestra[mudanca]).end();
  };
  
  const deletando = async (req, res) => {
    const { id } = req.params;
    const palestra = await leitura();
    const mudanca = palestra.findIndex((element) => element.id === Number(id));
    palestra.splice(mudanca, 1);
  
    await fs.writeFile(lista, JSON.stringify(palestra));
    return res.status(204).end();
  };

module.exports = {
    leitura,
    sendID,
    geradorToken,
    palestrante,
    editPalestrante,
    deletando,
};
