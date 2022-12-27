const pokemonImage = document.querySelector('.pokemon_image')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonName = document.querySelector('.pokemon_name')
const form = document.querySelector('.form')
const inputForm = document.querySelector('.input_search')
const btnPrev = document.querySelector('.btn_prev')
const btnNext = document.querySelector('.btn_next')

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''

    const data = await fetchPokemon(pokemon)

    if (data) {
        pokemonImage.style.display = 'block'
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][
            'front_default'
        ]
        pokemonNumber.innerHTML = data.id
        pokemonName.innerHTML = data.name

        inputForm.value = ''

        searchPokemon = data.id
    } else {
        pokemonImage.style.display = 'none'
        pokemonNumber.innerHTML = ''
        pokemonName.innerHTML = 'Not found'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    renderPokemon(inputForm.value.toLowerCase())
})

btnPrev.addEventListener('click', () => {
    if (searchPokemon == 1) {
        searchPokemon = 650
    }
    searchPokemon -= 1
    renderPokemon(searchPokemon)
})

btnNext.addEventListener('click', () => {
    if (searchPokemon == 649) {
        searchPokemon = 0
    }

    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)