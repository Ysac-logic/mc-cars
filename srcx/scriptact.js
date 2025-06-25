document.addEventListener("DOMContentLoaded", () => {
  const btnEsquerda = document.getElementById("esquerda");
  const btnDireita = document.getElementById("direita");
  const items = document.querySelectorAll("#main-list .item");

  let currentIndex = 0;

  function updateActiveItem(index) {
    items.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });
  }

  if (btnEsquerda && btnDireita && items.length > 0) {
    btnDireita.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % items.length;
      updateActiveItem(currentIndex);
    });

    btnEsquerda.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      updateActiveItem(currentIndex);
    });
  }

  
  updateActiveItem(currentIndex); 
});

// ---------------------------------------------------------------------------------------
document.querySelectorAll(".btnPlanos").forEach(button => {
  button.addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("modalOverlay").style.display = "flex";
    resetModal();
  });
});

document.getElementById("modalClose").addEventListener("click", () => {
  document.getElementById("modalOverlay").style.display = "none";
});

const form = document.getElementById("formConsorcio");
const erroMensagem = document.getElementById("erroMensagem");
const mensagemFinal = document.getElementById("mensagemFinal");

form.addEventListener("submit", e => {
  e.preventDefault();

  erroMensagem.textContent = "";
  mensagemFinal.textContent = "";
  mensagemFinal.className = "mensagem-final";
  mensagemFinal.style.display = "block";

  const cpf = document.getElementById("cpf").value.trim();
  const nascimento = new Date(document.getElementById("nascimento").value);
  const idade = calcularIdade(nascimento);

  
  if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
    erroMensagem.textContent = "CPF deve conter 11 números.";
    return;
  }

  if (isNaN(nascimento.getTime())) {
    erroMensagem.textContent = "Data de nascimento inválida.";
    return;
  }

  if (idade < 18) {
    erroMensagem.textContent = "Você precisa ter pelo menos 18 anos.";
    return;
  }

  form.style.display = "none";
  mensagemFinal.textContent = "Analisando dados...";
  mensagemFinal.style.color = "#333";

  setTimeout(() => {
    const aprovado = Math.random() < 0.5;

    if (aprovado) {
      mensagemFinal.textContent = "Parabéns! Você está autorizado a dar um lance nesse consórcio.";
      mensagemFinal.style.color = "green";
    } else {
      mensagemFinal.textContent = "Você não está autorizado a entrar nesse consórcio. Você é pobre demais.";
      mensagemFinal.style.color = "red";
    }

    mensagemFinal.style.fontWeight = "bold";
    mensagemFinal.style.fontSize = "1.2rem";
    mensagemFinal.style.textAlign = "center";
  }, 2000);
});

function calcularIdade(dataNascimento) {
  const hoje = new Date();
  let idade = hoje.getFullYear() - dataNascimento.getFullYear();
  const mes = hoje.getMonth() - dataNascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
    idade--;
  }

  return idade;
}

function resetModal() {
  form.style.display = "block";
  form.reset();
  erroMensagem.textContent = "";
  mensagemFinal.textContent = "";
  mensagemFinal.style.display = "none";
}
