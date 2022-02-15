const test = {
    main: ['example'],
    high: ['example'],
    mid: ['example'],
    low: ['example']
}
const url = 'https://620a9a0692946600171c5b7f.mockapi.io/db/tags/';
const main = document.querySelector('#main');
const high = document.querySelector('#high');
const mid = document.querySelector('#mid');
const low = document.querySelector('#low');
const id = 1;

const item = (i) => {
    return `<li>
        <div class='item'>
            <div class='hash'>#</div>
            <input class='tag' value=${i}>
            <div class='del' onclick="DELETE()">x</div>
        </div>
    </li>`
}

let inner = ''; test.main.map(i => inner += item(i)); main.innerHTML = inner;
test.high.map(i => inner += item(i)); high.innerHTML = inner;
test.mid.map(i => inner += item(i)); mid.innerHTML = inner;
test.low.map(i => inner += item(i)); low.innerHTML = inner;

fetch(url)
    .then(response => response.json())
    .then(commits => {
        console.log(commits[id])
        let inner = []; commits[id].main.map(i => inner += `<li>${i}</li>`); main.innerHTML = inner;
        inner = []; commits[id].high.map(i => inner += `<li>${i}</li>`); high.innerHTML = inner;
        inner = []; commits[id].mid.map(i => inner += `<li>${i}</li>`); mid.innerHTML = inner;
        inner = []; commits[id].low.map(i => inner += `<li>${i}</li>`); low.innerHTML = inner;
    });

const DELETE = async (id) => await fetch(url + id, { method: 'DELETE' });
const POST = async () => await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify()
});

const add = async (column) => {
    let inner = `<li>
        <div class='item'>
            <div class='hash'>#</div>
            <input class='tag' value='newtag' autofocus>
            <div class='del' onclick="DELETE()">x</div>
        </div>
    </li>`
    column.innerHTML += inner;
}
