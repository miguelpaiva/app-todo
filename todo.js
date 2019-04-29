// referencia elementos no js
var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

/*/var todos = [
    'Fazer Torrada',
    'Estudar Javascript',
    'Tocar Guitarra'
]; */

var todos = JSON.parse(localStorage.getItem('list_todos')) || ['Fazer Torrada','Estudar Javascript','Tocar Guitarra'];

// funcao para renderizar todos na tela
function renderTodos(){
    listElement.innerHTML = ''; // deixa todo o conteudo vazio para nao renderizar td novamente, somente o que aparecer de novo
    
    for (todo of todos){ // for para rodar a lista de todos
        var todoElement = document.createElement('li'); // cria novo li para ser o novo todo
        var todoText = document.createTextNode(todo);   // cria texto com o todo pego pelo for

        var linkElement = document.createElement('a'); //cria um a onde ira excluir o todo
        linkElement.setAttribute('href', '#'); // cria link para o texto poder ser clicavel
        var linkText = document.createTextNode('Excluir');
        
        var pos = todos.indexOf(todo);  // atribui a variavel pos o numero da posicao no vetor
        linkElement.setAttribute('onclick', 'deleteTodo('+pos+')');
        
        linkElement.appendChild(linkText);    // adiciona o texto 'excluir' ao a


        todoElement.appendChild(todoText);     // adiciona o texto(titulo) ao li criado
        todoElement.appendChild(linkElement);  // adiciona o a ao li criado
        
        listElement.appendChild(todoElement);  // adiciona o novo li ao ul
    }
}

renderTodos();

// adicionar item todo
function addTodo(){
    var todoText = inputElement.value;  // armazena na variavel o texto da caixa de texto
    todos.push(todoText);               // adiciona a lista de todo o texto da variavel (caixa de texto)
    renderTodos();
    saveToStorage();
}

buttonElement.onclick = addTodo;

// excuir item todo
function deleteTodo(pos){ // recebe como parametro a posicao no vetor do item a ser removido
    todos.splice(pos, 1); // remove item do vetor (posicao, quantos item a ser removidos)
    renderTodos();
    saveToStorage();
}


// para salvar no storage local, e preciso converter o vetor, objeto em alguma estrutura
// compreensivel para o banco, nesse caso o JSON
function saveToStorage(){
    listTodos = JSON.stringify(todos);   // variavel recebe o vetor covertido em JSON
    localStorage.setItem('list_todos', listTodos);  // 
}