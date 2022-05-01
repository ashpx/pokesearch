document.querySelector('button').addEventListener('click', getPokemon);
document.querySelector('input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.querySelector('button').click();
    }
});

function getPokemon() {
    let pokemon = document.querySelector('input').value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.querySelector('.name').innerText = capitalizeFirstLetter(data.species.name);
            document.querySelector('.default-sprite').src = data.sprites.front_default;
            document.querySelector('.shiny-sprite').src = data.sprites.front_shiny;
            document.querySelector('.type').innerText = capitalizeFirstLetter(data.types[0].type.name);
            if (data.types[1]) {
                document.querySelector('.type').innerText = `${capitalizeFirstLetter(data.types[0].type.name)}/${capitalizeFirstLetter(data.types[1].type.name)}`;
            }
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}