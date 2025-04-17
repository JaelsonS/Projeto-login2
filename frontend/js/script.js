document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        username: document.getElementById('username').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value.trim()
    };

    console.log('📤 Dados enviados:', data); 

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('📥 Resposta do servidor:', result); 

        if (response.ok) {
            alert('Cadastro realizado! Redirecionando...');
            window.location.href = 'login.html';
        } else {
            alert(`Erro: ${result.error || 'Falha no cadastro'}`);
        }
    } catch (error) {
        console.error('💥 Erro fatal:', error);
        alert('Erro ao conectar ao servidor');
    }
});

document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value.trim()
    };

    console.log('🔐 Tentando login com:', data); 

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('🔓 Resposta do login:', result); 

        if (result.success) {
            localStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = 'home.html';
        } else {
            alert(`Falha: ${result.error || 'Credenciais inválidas'}`);
        }
    } catch (error) {
        console.error('💥 Erro catastrófico:', error);
        alert('Servidor offline');
    }
});