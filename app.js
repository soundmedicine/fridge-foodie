const subButt = document.querySelector('button')
const input = document.querySelector('input')
const form = document.querySelector('form')
const recipes = document.querySelector('.recipes')

form.addEventListener('submit', submission)

function submission(event) {
    recipes.innerHTML = ''
    event.preventDefault()
    const ingredient = input.value
    getRecipes(ingredient)
}

function getRecipes(ingredient) {
    const BASE_URL = 'https://galvanize-cors.herokuapp.com/http://www.recipepuppy.com/api/?i=' + ingredient

fetch(BASE_URL) 
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        let recipeList = data.results
        console.log(recipeList)
        if (recipeList != 0) {
            let label = document.querySelector('label')
            label.textContent = "What's in your fridge?"
            recipeList.forEach(function(recipe) {
                let cardDiv = document.createElement('div')
                cardDiv.setAttribute('class', 'card')
                cardDiv.textContent = recipe.title
                recipes.appendChild(cardDiv)
                let imageDiv = document.createElement('div')
                imageDiv.setAttribute('class', 'card-image')
                cardDiv.appendChild(imageDiv)
                let image = document.createElement('img')
                image.src = recipe.thumbnail
                imageDiv.appendChild(image)
                let span = document.createElement('span')
                span.setAttribute('class', 'card-title')
                cardDiv.appendChild(span)
                let content = document.createElement('div')
                content.setAttribute('class', 'card-content')
                cardDiv.appendChild(content)
                let includes = document.createElement('p')
                includes.textContent = 'This recipe includes ' + ingredient + '.'
                includes.setAttribute('class', 'includes')
                content.appendChild(includes)
                let actionDiv = document.createElement('div')
                actionDiv.setAttribute('class', 'card-action')
                cardDiv.appendChild(actionDiv)
                let link = document.createElement('a')
                link.href = recipe.href
                link.textContent = 'Take me to this recipe!'
                link.setAttribute('class', 'takeMe')
                actionDiv.appendChild(link)
                input.value = ''
        })
    } else {
            fetch("error.json")
            .then(function(response) {
                return response.json()
            })
            .then(function(data) {
                let message = data[parseInt(Math.random(4))].message
                console.log(message)
                let label = document.querySelector('label')
                label.textContent = message
            })
        }
    })
    .catch(function(err) {
        console.log(err.message);
    })

}


