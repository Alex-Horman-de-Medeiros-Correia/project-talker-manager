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

module.exports = {
    leitura,
    sendID,
    geradorToken,
    palestrante,
};
