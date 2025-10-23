
function atualizarHora() {
  const agora = new Date();
  document.getElementById('hora').innerText = `🕒 ${agora.toLocaleTimeString()}`;
  document.getElementById('data').innerText = `📅 ${agora.toLocaleDateString('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long'
  })}`;
}

setInterval(atualizarHora, 1000);
atualizarHora();

const frases = [
  "A persistência realiza o impossível.",
  "Você é mais forte do que imagina.",
  "Cada dia é uma nova chance.",
  "Pequenos passos te levam longe."
];
document.getElementById('frase').innerText = frases[Math.floor(Math.random() * frases.length)];


const API_KEY = "SUA_API_KEY_AQUI"; 
const cidade = "São Paulo";

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${API_KEY}&lang=pt_br`)
  .then(res => res.json())
  .then(dados => {
    const temp = Math.round(dados.main.temp);
    const desc = dados.weather[0].description;
    document.getElementById('clima').innerText = `${temp}°C - ${desc}`;
  })
  .catch(() => {
    document.getElementById('clima').innerText = "Não foi possível carregar o clima.";
  });


const lista = document.getElementById('lista');
const input = document.getElementById('novaTarefa');
const btn = document.getElementById('adicionar');

function getTarefas() {
  return JSON.parse(localStorage.getItem('tarefas')) || [];
}

function salvarTarefas(tarefas) {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
  const tarefas = getTarefas();
  lista.innerHTML = '';
  tarefas.forEach((t, i) => {
    const li = document.createElement('li');
    li.innerText = t;
    li.addEventListener('click', () => removerTarefa(i));
    lista.appendChild(li);
  });
}

function adicionarTarefa() {
  const tarefa = input.value.trim();
  if (!tarefa) return;
  const tarefas = getTarefas();
  tarefas.push(tarefa);
  salvarTarefas(tarefas);
  input.value = '';
  carregarTarefas();
}

function removerTarefa(i) {
  const tarefas = getTarefas();
  tarefas.splice(i, 1);
  salvarTarefas(tarefas);
  carregarTarefas();
}

btn.addEventListener('click', adicionarTarefa);
carregarTarefas();