// Função para extrair o número do Pokémon da URL
function getPokemonNumberFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('number');
}

// Função para buscar os detalhes do Pokémon com base no número
function fetchPokemonDetails(number) {
    // Use o número para buscar os detalhes do Pokémon da API
    // Atualize os elementos HTML na página com os detalhes do Pokémon
    const url = `https://pokeapi.co/api/v2/pokemon/${number}/`;

    fetch(url)
        .then((response) => response.json())
        .then((pokemonData) => {
            document.querySelector('.pokemon-name').textContent = pokemonData.name;
            document.querySelector('.pokemon-number').textContent = `# ${pokemonData.id}`;
            document.querySelector('.pokemon-image').src = pokemonData.sprites.other.dream_world.front_default;
            // Multiplicando a altura por 10 para transformar em cm
            const heightInCm = pokemonData.height * 10;
            document.querySelector('.pokemon-height').textContent = `${heightInCm} cm`;
            // Dividindo o peso por 10 para transformar em kg
            const weightInKg = pokemonData.weight / 10;
            document.querySelector('.pokemon-weight').textContent = `${weightInKg} kg`;

            // Limpe a lista de tipos antes de adicionar os novos
            const typesList = document.querySelector('.pokemon-types');
            typesList.innerHTML = '';
            
            pokemonData.types.forEach((typeData) => {
                const typeListItem = document.createElement('li');
                typeListItem.textContent = typeData.type.name;
                typeListItem.classList.add('type');
                typesList.appendChild(typeListItem);
            });

            // Suponha que a variável 'pokemonTypes' contenha a lista de tipos do Pokémon.
            const pokemonTypes = pokemonData.types;

            // Encontre todos os elementos da lista de tipos
            const typeElements = document.querySelectorAll('.type');

            // Itere sobre cada tipo e atribua a classe correspondente aos elementos da lista
            for (let i = 0; i < typeElements.length; i++) {
                // Obtenha o nome do tipo para esta posição
                const pokemonType = pokemonTypes[i].type.name;

                // Adicione a classe correspondente ao elemento atual
                typeElements[i].classList.add(pokemonType);
            }

            const fixedSection = document.querySelector('.pokemon-info');
            // Supondo que o tipo do Pokémon esteja na primeira posição do array types
            const pokemonType = pokemonData.types[0].type.name;

            // Adicione uma classe CSS com base no tipo
            fixedSection.classList.add(pokemonType);
        
        })
        .catch((error) => {
            console.error(error);
        });
}

// Obtenha o número do Pokémon da URL
const pokemonNumber = getPokemonNumberFromURL();

// Se o número do Pokémon estiver presente na URL, busque seus detalhes
if (pokemonNumber) {
    fetchPokemonDetails(pokemonNumber);
}