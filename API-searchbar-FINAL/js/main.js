const search = document.getElementById('search');
const matchList = document.getElementById('joke-area');
const jokeBtn = document.getElementById('joke-btn');


// ------------------------------ add random joke to DOM ------------------------
const addJoke = () => {
    const jokeArea = document.getElementById('joke-area');
    while (jokeArea.firstChild) {
        jokeArea.removeChild(jokeArea.lastChild);
    }

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    fetch("https://icanhazdadjoke.com/", requestOptions)
        .then(response => response.json())
        .then(jokeData => { 
            let randomJoke = jokeData.joke;
            const textNode = document.createTextNode(randomJoke);
            const li = document.createElement('li');
            li.classList.add("joke-text");
            li.appendChild(textNode);
            jokeArea.appendChild(li);
        })
    .catch(error => console.log('error', error));
}

jokeBtn.addEventListener( 'click', addJoke);
// ------------------------------------ add search results -------------------------------------------


//searchs jokes.json and filter it

const searchJokes = async searchText => {
    
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    const res = await fetch(`https://icanhazdadjoke.com/search?term=${searchText}`, requestOptions);
    const data = await res.json();
    const jokes = data.results;
    

    //Get matches to current text input
    let matches = jokes.filter(joke => {
        return joke.joke.includes(searchText) || joke.joke.startsWith(searchText);
    });

    //Clear results

    if (searchText && searchText.trim().length > 0) {
        searchText = searchText.trim().toLowerCase();
        outputHtml(matches).sort((jokeA, jokeB) => {
            return getRelevancy(jokeB.joke, searchText) - getRelevancy(JokeA.joke, searchText);
        });                        
    } else {
        clearList();
    }
    // if(searchText.length === 0) {
    //     matches = [];
        
    // }

    
};

function clearList() {
    while (matchList.firstChild) {
        matchList.removeChild(matchList.firstChild);
    }
}
//sort by relevance
function getRelevancy(value, searchText) {
    if(value === searchTerm) {
        return 2;
    } else if (value.startsWith(searchText)) {
        return 1;
    } else {
        return 0;
    }
}

//Show results in html
const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => 
            `<li>${match.joke}</li>`)
        .join('');

        matchList.innerHTML = html;
    }

}


//event listener
search.addEventListener('input', () => searchJokes(search.value));