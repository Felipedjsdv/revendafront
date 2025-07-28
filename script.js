function navigate(page) {
  const pageTitle = document.getElementById("page-title");
  const content = document.getElementById("content");

  pageTitle.textContent = capitalize(page);

  switch (page) {
    case "dashboard":
      content.innerHTML = "<p>Resumo geral do sistema...</p>";
      break;
    case "clientes":
      content.innerHTML = "<p>Lista de clientes cadastrados...</p>";
      break;
    case "financeiro":
      content.innerHTML = "<p>Controle financeiro e faturas...</p>";
      break;
    case "config":
      content.innerHTML = "<p>Configurações do sistema...</p>";
      break;
    default:
      content.innerHTML = "<p>Seção não encontrada.</p>";
  }

  document.querySelectorAll(".sidebar nav ul li").forEach(li => li.classList.remove("active"));
  event.target.classList.add("active");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function logout() {
  alert("Você foi deslogado!");
}

let clientes = JSON.parse(localStorage.getItem("clientes") || "[]");

function salvarCliente(e) {
  e.preventDefault();
  const form = e.target;
  const cliente = {
    nome: form.nome.value,
    email: form.email.value,
    whatsapp: form.whatsapp.value,
    vencimento: form.vencimento.value,
    plano: form.plano.value
  };
  clientes.push(cliente);
  localStorage.setItem("clientes", JSON.stringify(clientes));
  form.reset();
  renderClientes();
}

function renderClientes() {
  const tbody = document.getElementById("listaClientes");
  if (!tbody) return;
  tbody.innerHTML = "";

  clientes.forEach((c, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.nome}</td>
      <td>${c.email}</td>
      <td>${c.whatsapp}</td>
      <td>${c.vencimento}</td>
      <td>${c.plano}</td>
      <td>
        <button onclick="excluirCliente(${i})">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function excluirCliente(index) {
  if (confirm("Deseja excluir este cliente?")) {
    clientes.splice(index, 1);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    renderClientes();
  }
}
