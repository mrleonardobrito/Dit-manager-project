require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

// Middleware para servir arquivos estáticos
app.use(express.static(__dirname));
app.use(express.json());

// Rota para a página de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para a página principal
app.get('/public/dit-manager.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dit-manager.html'));
});

// Rota para autenticação
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === process.env.DIT_DEV_LOGIN && password === process.env.DIT_DEV_PASS) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Usuário ou senha incorretos' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}); 