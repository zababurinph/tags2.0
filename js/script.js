const test = {
    main: ['example', 'example'],
    high: ['example', 'example'],
    mid: ['example', 'example'],
    low: ['example', 'example']
}
const url = 'https://620a9a0692946600171c5b7f.mockapi.io/db/tags/';
const main = document.querySelector('#main');
const high = document.querySelector('#high');
const mid = document.querySelector('#mid');
const low = document.querySelector('#low');
const id = 1;

fetch(url)
    .then(response => response.json())
    .then(commits => {
        console.log(commits[id])
        main.innerHTML = commits[id].main.join('<br>');
        high.innerHTML = commits[id].main.join('<br>');
        mid.innerHTML = commits[id].main.join('<br>');
        low.innerHTML = commits[id].main.join('<br>');
    });

const DELETE = async (id) => await fetch(url + id, { method: 'DELETE' });
const POST = async () => await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(test)
});