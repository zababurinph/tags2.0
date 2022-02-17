import { btnClick } from "./code.js";

const url = 'https://620a9a0692946600171c5b7f.mockapi.io/db/tags/';
const error404 = `<h1 style='margin: 5em 30px; text-align: center;'>
    В данный момент на сервере проводятся технические работы<br>
    <br>
    Приносим свои извинения
</h1>`

const main = document.querySelector('#main');
const high = document.querySelector('#high');
const mid = document.querySelector('#mid');
const low = document.querySelector('#low');

const addmain = document.querySelector('#addmain');
const addhigh = document.querySelector('#addhigh');
const addmid = document.querySelector('#addmid');
const addlow = document.querySelector('#addlow');

const generatebtn = document.querySelector('#generate');
const btnClickListener = (e) => btnClick(data);
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

let data = {};

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

const refresh = async () => await fetch(url)
    .then(response => response.json())
    .then(commits => {
        console.log('Download:', commits[id]);
        data = commits[id];
        if (data !== 'N') {
            dataToHTML();
            addmain.addEventListener('click', mainlistener);
            addhigh.addEventListener('click', highlistener);
            addmid.addEventListener('click', midlistener);
            addlow.addEventListener('click', lowlistener);
            generatebtn.addEventListener('click', btnClickListener);
        }
        else document.querySelector('.content').innerHTML = error404;
    });
refresh();

const mainlistener = () => addFunction(addmain, main, mainlistener);
const highlistener = () => addFunction(addhigh, high, highlistener);
const midlistener = () => addFunction(addmid, mid, midlistener);
const lowlistener = () => addFunction(addlow, low, lowlistener);

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
    generatebtn.removeEventListener('click', btnClickListener);
    generatebtn.addEventListener('click', generateClicker);

    let input = document.querySelector(`#${column.id}${data[column.id].length}`);
    input.addEventListener('click', inputClicker);
    const inputlistener = (e) => { if (e.key === 'Enter') allClicker(e, column, input, add, listener, alllistener) };
    input.addEventListener('keypress', inputlistener);

    const alllistener = (e) => allClicker(e, column, input, add, listener, alllistener);
    document.addEventListener('click', alllistener);
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
function generateClicker(e) {
    e.stopPropagation();
    console.log('generate');
}
function inputClicker(e) {
    e.stopPropagation();
    console.log('input');
}
function allClicker(e, column, input, add, listener, alllistener) {
    if ((e.target !== input || e.key === 'Enter') && e.target !== add) {
        input.removeEventListener('click', inputClicker);
        document.removeEventListener('click', alllistener);
        add.removeEventListener('click', addClicker);
        add.addEventListener('click', listener);
        generatebtn.removeEventListener('click', generateClicker);
        generatebtn.addEventListener('click', btnClickListener);
        input.autofocus = false;
        input.blur();

        if (input.value !== '') {
            let alreadyHere = false;
            for (let key in data) if (data[key].indexOf(input.value) !== -1) alreadyHere = true;
            if (!alreadyHere) {
                data[column.id].push(input.value);
                PUT();
            }
            else {
                dataItemToHTML(column);
                alert('Такой тэг уже существует');
            }
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
    // dataItemToHTML(column);
    PUT();
    console.log(data)
}

const POST = async () => await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
});

const PUT = async () => await fetch(`${url}${id + 1}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
});