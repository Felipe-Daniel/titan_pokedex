const fs = require('fs').promises;

async function addPokemon(pokemonName) {
    try {
        const data = await fs.readFile('pokemon-list.json', 'utf-8');
        const pokemonList = JSON.parse(data);
        pokemonList.pokemons.push(pokemonName);
        await fs.writeFile('pokemon-list.json', JSON.stringify(pokemonList, null, 2), 'utf-8');
    } catch (error) {
        console.error(error.message);
    }
}


async function findPokemon(pokemonName) {
    try {
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            const pokemonName = data.name;
            const types = data.types.map((type) => type.type.name);
            return { pokemonName, types };
        } else {
            throw new Error('Pokemon não encontrado na lista');
        }
    } catch (error) {
        throw new Error(error.message);
    }
}


(async () => {
    try {
        const pokemonName = 'Pikachu';
        addPokemon(pokemonName);
        const result = await findPokemon(pokemonName);
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
})();