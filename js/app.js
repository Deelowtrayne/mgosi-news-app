const main = document.querySelector('#main');
const sourcesElem = document.querySelector('.source-dropdown');

const NEWS_API_KEY = 'ef2f14077f2e4bfbba05c8b0495b50db';

function createArticle (article) {
    return `
        <div class="card">
            <div class="card-image">
                <img src="${article.urlToImage}">
                <span class="card-title">${article.title}</span>
                <a href="${article.url}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">local_library</i></a>
            </div>
            <div class="card-content">
                <p>${article.description}</p>
            </div>
        </div>
    `
}

async function updateNews(source) {
    const result = await fetch(`https://newsapi.org/v2/everything?q=business&language=en&sources=${source}&apiKey=${NEWS_API_KEY}`);
    const json = await result.json();
    main.innerHTML = json.articles
        .map(createArticle).join('\n');
}

async function updateSources(){
    const result = await fetch(`https://newsapi.org/v2/sources?language=en&apiKey=${NEWS_API_KEY}`);
    const json = await result.json();
    sourcesElem.innerHTML = json.sources
        .map(source => `<option value="${source.id}">${source.name}</option>`)
        .join('\n');
}

window.addEventListener('load', () => {
    let defaultSrc = sourcesElem.value = "cbs-news";
    updateSources();
    updateNews(defaultSrc);

    sourcesElem.addEventListener('change', () => {
        let source = sourcesElem.value;
        updateNews(source);
    });

    if (navigator.serviceWorker) {
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('serviceWorker registered');
            
        } catch (error) {
            console.error(error);
        }
    }
});

