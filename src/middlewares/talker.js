const checando = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || authorization === '') {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    next();
  };
  
  const nome = (req, res, next) => {
    const { name } = req.body;
    if (!name || name === '') {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    next();
  
    if (name.length < 3) {
      return res.status(400).json({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      });
    }
    next();
  };
  
  const idade = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
      return res.status(400).json({
        message: 'A pessoa palestrante deve ser maior de idade',
      });
    }
    next();
  };
  
  const watched = (watchedAt) => {
    if (!watchedAt) {
      return {
        message: 'O campo "watchedAt" é obrigatório',
      };
    }
    if (!watchedAt.match(/(\d\d\/){2}\d{4}/)) {
      return {
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      };
    }
  };
  
  const rating = (rate) => {
    console.log('rate');
    if (typeof rate !== 'number') {
      return {
        message: 'O campo "rate" é obrigatório',
      };
    }
    if (rate < 1 || rate > 5) {
      return {
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      };
    }
  };
  
  const talking = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
      return res.status(400).json({
        message: 'O campo "talk" é obrigatório',
      });
    }
    const watchedAt = watched(talk.watchedAt);
    if (watchedAt) return res.status(400).json(watchedAt);
    const rate = rating(talk.rate);
    if (rate) return res.status(400).json(rate);
    next();
  };
  
  module.exports = {
    checando,
    nome,
    idade,
    rating,
    talking,
  };
