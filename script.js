var formulario = document.querySelector('form');

formulario.addEventListener('submit', function(e){
    //bloqueia o refresh da pagina
    e.preventDefault();

    //url da api
    let urlForm = ' https://pokeapi.co/api/v2/pokemon/';

    //pega o valor do input
    let nome = document.getElementById('name');

    //concatena a url com o valor do input
    urlForm = urlForm + nome.value;

    //transforma os valores em letras minusculas
    urlForm = urlForm.toLocaleLowerCase();


    //ID content
    let resposta = document.getElementById('content');

    //id imgPokemon
    let imagem = document.getElementById('imgPokemon');

    //resposta em HTML
    let html = '';

    fetch(urlForm)
       .then(resposta => resposta.json())
       .then(function(data){
            console.log(data);
            html = 'nome: ' + maiuscula(data.name) + '<br>';
            html = html + 'Type: ' + maiuscula(data.types[0].type.name);
            resposta.innerHTML = html;

            imagem.innerHTML = "<img src='" + data.sprites.front_default + "'><img src='"+ data.sprites.back_default + "'>";
       })
       .catch(function(error){
             if(error == 'SyntaxError: Unexpected token N in JSON at position 0'){
                 html = 'Pokémon não encontrado!';
             }else {
                html = 'Erro:' + error;
             }

             resposta.innerHTML = html;
       })
});

//pega primeiro valor e coloca em maiuscula o resto em minuscula
function maiuscula(val) {
    return val[0].toUpperCase() + val.substr(1);
}