const lista = document.getElementById("lista");
const form = document.getElementById("form");
const input = document.getElementById("tarefa");
//importa, do arquivo index.html, os elementos "lista", "form" e "tarefa".

let tarefas = JSON.parse(localStorage.getItem("tarefas") || "[]");
//cria o array "tarefas" no armazenamento e, caso seja a primeira vez do usuário usando a aplicação, será inicializado como um array vazio (por conta do "|| "[]"").

function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
//salva a entrada do usuário no array de tarefas criado anteriormente, e o transforma em string. ou seja, após a chamada dessa função, o armazenamento terá a string JSON correspondente ao array "tarefas".

function render() {
  lista.innerHTML = "";
  tarefas.forEach((t, i) => {
    const li = document.createElement("li");
    //t = tarefa atual
    //i = posição da tarefa no array (chamado índice)
    //render serve para redesenhar a lista de tarefas, estas aspas duplas servindo para começar com uma string vazia e ir, então, implementando as tarefas.

    const chk = document.createElement("input");
    chk.type = "checkbox";
    chk.checked = t.feita;
    chk.onchange = () => {
      tarefas[i].feita = !tarefas[i].feita;
      salvar();
      render();
    };
    //cria um elemento, definindo como checkbox e definindo que está marcado se a tarefa é marcada como feita pelo usuário e, também, define que é desmarcada se o usuário mandar.

    const prompt = document.createElement("prompt");
    prompt.textContent = t.texto;
    if (t.feita) prompt.style.textDecoration = "line-through";
    //cria a constant "prompt", que recebe o valor do texto da tarefa e, caso esta esteja marcada como concluída, risca o texto no meio.

    const btn = document.createElement("button");
    btn.textContent = "X";
    btn.onclick = () => {
      tarefas.splice(i, 1);
      salvar();
      render();
    };
    //cria um botão, com o texto sendo um X. ao ser clicado, remove a tarefa de acordo com o índice (mencionado anteriormente na função de render).

    li.append(chk, prompt, btn);
    lista.appendChild(li);
  });
  //cria uma lista com as constantes mencionadas anteriormente (botão, checkbox e prompt), colocando-a dentro da ul ("lista").
}

form.onsubmit = (e) => {
  e.preventDefault();
  tarefas.push({ texto: input.value, feita: false });
  input.value = "";
  salvar();
  render();
};
//é o evento que acontece quando uma tarefa é enviada, onde: a linha 51 evita que a página seja recarregada quando envia a tarefa; a linha 52 adiciona a tarefa no array, como não concluída; a linha 53 limpa a caixa de texto para a inserção da próxima tarefa; a linha 54 chama a função de salvar; a linha 54 chama a função de render para redesenhar a lista com a nova inserção.

render();
//este render serve para desenhar a lista logo que a aplicação seja aberta, mostrando todas as tarefas salvas e se estão ou não concluídas, como explicado anteriormente. caso não haja tarefas, a lista estará vazia.
