const apiUrl = 'https://revenda.onrender.com';

// LOGIN
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const telefone = document.getElementById('telefone').value;
  const senha = document.getElementById('senha').value;

  const res = await fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ telefone, senha })
  });

  const data = await res.json();

  if (res.ok && data.success) {
    localStorage.setItem('user', JSON.stringify(data.user));
    window.location.href = 'painel.html';
  } else {
    alert('Telefone ou senha inválidos.');
  }
});

// VERIFICAR LOGIN NO PAINEL
function verificarLogin() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    alert('Faça login para acessar o painel.');
    window.location.href = 'index.html';
  }
  return user;
}

// BOTÃO LOGOUT
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
});

// GERAR TESTE
document.getElementById('gerarTeste')?.addEventListener('click', async () => {
  const user = verificarLogin();
  const tempo = document.getElementById('tempo')?.value || '60';
  const metodo = document.querySelector('input[name="metodo"]:checked')?.value || 'whatsapp';

  const res = await fetch(`${apiUrl}/gerar-teste`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      telefone: user.telefone,
      minutos: tempo,
      metodo
    })
  });

  const data = await res.json();

  if (res.ok) {
    alert('Teste gerado com sucesso!');
    carregarHistorico();
  } else {
    alert('Erro ao gerar teste.');
  }
});

// CARREGAR HISTÓRICO
async function carregarHistorico() {
  const user = verificarLogin();
  const res = await fetch(`${apiUrl}/historico/${user.telefone}`);
  const historico = await res.json();
  const lista = document.getElementById('historico');
  if (lista) {
    lista.innerHTML = '';
    historico.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = `Teste para ${item.metodo.toUpperCase()} - ${item.minutos} min`;
      lista.appendChild(li);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('painel.html')) {
    verificarLogin();
    carregarHistorico();
  }
});
