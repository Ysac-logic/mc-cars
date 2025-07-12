const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

const usuarios = {
  admin: '1234',
  maria: '456',
  joao: 'abc'
};

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); // Servir HTML, CSS, JS

app.use(session({
  secret: 'segredo-super',
  resave: false,
  saveUninitialized: false
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
  const { usuario, senha } = req.body;

  if (usuarios[usuario] && usuarios[usuario] === senha) {
    req.session.usuario = usuario;
    return res.json({ sucesso: true });
  }

  res.json({ sucesso: false, mensagem: 'Usuário ou senha incorretos' });
});

app.get('/action.html', (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/');
  }

  res.send(`
    <h1>Bem-vindo, ${req.session.usuario}!</h1>
    <p>Você está logado.</p>
    <a href="/logout">Sair</a>
  `);
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
