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

module.exports = {
    leitura,
    sendID,
    geradorToken,
};
