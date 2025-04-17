const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    next();
});


if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, '[]', 'utf8');
}

app.post('/register', (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Preencha todos os campos' });
        }

        const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
        if (users.some(user => user.email === email)) {
            return res.status(400).json({ error: 'Email já existe' });
        }

        const newUser = { id: Date.now(), username, email, password };
        fs.writeFileSync(USERS_FILE, JSON.stringify([...users, newUser], null, 2));
        
        console.log('✅ Usuário cadastrado:', newUser);
        res.status(201).json({ success: true });
    } catch (err) {
        console.error('❌ Erro no cadastro:', err);
        res.status(500).json({ error: 'Erro interno' });
    }
});

app.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
        const user = users.find(u => u.email === email && u.password === password);

        console.log('🔑 Tentativa de login:', { email, password });
        console.log('📦 Usuários cadastrados:', users); 

        if (user) {
            res.json({ success: true, user });
        } else {
            res.status(401).json({ error: 'Email ou senha inválidos' });
        }
    } catch (err) {
        console.error('❌ Erro no login:', err);
        res.status(500).json({ error: 'Erro interno' });
    }
});

app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));