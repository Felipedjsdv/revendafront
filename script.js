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
