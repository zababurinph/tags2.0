const url = 'https://620a9a0692946600171c5b7f.mockapi.io/db/tags/';

const main = document.querySelector('#main');
const high = document.querySelector('#high');
const mid = document.querySelector('#mid');
const low = document.querySelector('#low');

const addmain = document.querySelector('#addmain');
const addhigh = document.querySelector('#addhigh');
const addmid = document.querySelector('#addmid');
const addlow = document.querySelector('#addlow');

const id = 0;

const item = (i, id, column) => {
    return `<li>
        <div class='item'>
            <div class='hash'>#</div>
            <input type='text' class='tag' value=${i} id='${column}${id}'>
            <div class='del' onclick="DELETE('${column}', ${id})">x</div>
        </div>
    </li>`
}

let data = {
    main: ['serverlost1'],
    high: ['serverlost1', 'serverlost2'],
    mid: ['serverlost1', 'serverlost2', 'serverlost3'],
    low: ['serverlost1', 'serverlost2', 'serverlost3', 'serverlost4']
}

const dataItemToHTML = (column) => {
    let inner = '';
    data[column.id].map((i, index) => inner += item(i, index, column.id));
    column.innerHTML = inner;
}

const dataToHTML = () => {
    dataItemToHTML(main);
    dataItemToHTML(high);
    dataItemToHTML(mid);
    dataItemToHTML(low);
}

const refresh = () => fetch(url)
    .then(response => response.json())
    .then(commits => {
        console.log('Download:', commits[id]);
        data = commits[id];
        dataToHTML();
    });
refresh();

const mainlistener = () => addFunction(addmain, main, mainlistener); addmain.addEventListener('click', mainlistener);
const highlistener = () => addFunction(addhigh, high, highlistener); addhigh.addEventListener('click', highlistener);
const midlistener = () => addFunction(addmid, mid, midlistener); addmid.addEventListener('click', midlistener);
const lowlistener = () => addFunction(addlow, low, lowlistener); addlow.addEventListener('click', lowlistener);

const addFunction = (add, column, listener) => {
    let inner = `<li>
        <div class='item'>
            <div class='hash'>#</div>
            <input type='text' class='tag' id='${column.id}${data[column.id].length}' autofocus>
            <div class='del' onclick="DELETE('${column.id}', ${data[column.id].length})">x</div>
     </div>
    </li>`;
    column.insertAdjacentHTML('beforeend', inner);

    add.removeEventListener('click', listener);
    add.addEventListener('click', addClicker);

    let input = document.querySelector(`#${column.id}${data[column.id].length}`);
    input.addEventListener('click', inputClicker);
    const alllistener = (e) => allClicker(e, column, input, add, listener, alllistener); document.addEventListener('click', alllistener );
    // console.log(input);
}

function addClicker(e) {
    e.stopPropagation();
    // if (value !== '') {
    //     data[name].push(value);
    //     // PUT();
    // }

    console.log('add');
    // console.log(data);
}
function inputClicker(e) {
    e.stopPropagation();
    console.log('input');
}
function allClicker(e, column, input, add, listener, alllistener) {
    if (e.target !== input && e.target !== add) {
        input.removeEventListener('click', inputClicker);
        document.removeEventListener('click', alllistener);
        add.removeEventListener('click', addClicker);
        add.addEventListener('click', listener);
        input.autofocus = false;

        if (input.value !== '') {
            data[column.id].push(input.value);
            PUT();
        }
        else dataItemToHTML(column);

        console.log(data);
    }
    console.log('all');
}

//---------------------------------------------------------------
const DELETE = async (column, id) => {
    data[column].splice(id, 1);
    let inner = '';
    data[column].map((i, index) => inner += item(i, index, column));
    document.querySelector(`#${column}`).innerHTML = inner;
    PUT();
    console.log(data)
}
const POST = async () => await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify()
});

const PUT = async () => await fetch(`${url}${id + 1}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
});