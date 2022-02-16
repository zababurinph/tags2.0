const url = 'https://620a9a0692946600171c5b7f.mockapi.io/db/tags/';
const main = document.querySelector('#main');
const high = document.querySelector('#high');
const mid = document.querySelector('#mid');
const low = document.querySelector('#low');
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

const dataToHTML = () => {
    let inner = ''; data.main.map((i, index) => inner += item(i, index, 'main')); main.innerHTML = inner;
    inner = []; data.high.map((i, index) => inner += item(i, index, 'high')); high.innerHTML = inner;
    inner = []; data.mid.map((i, index) => inner += item(i, index, 'mid')); mid.innerHTML = inner;
    inner = []; data.low.map((i, index) => inner += item(i, index, 'low')); low.innerHTML = inner;
}
dataToHTML();

const refresh = () => fetch(url)
    .then(response => response.json())
    .then(commits => {
        console.log(commits[id]);
        data = commits[id];
        dataToHTML();
    });
refresh();

const add = async (column, name) => {
    column.innerHTML += `<li>
        <div class='item'>
            <div class='hash'>#</div>
            <input type='text' class='tag' id='${name}${data[name].length}' autofocus>
            <div class='del' onclick="DELETE('${name}', ${data[name].length})">x</div>
     </div>
    </li>`;

    let input = document.querySelector(`#${name}${data[name].length}`)
    input.addEventListener('click', e => inputClicker(e))
    let add = document.querySelector(`#add${name}`)
    add.addEventListener('click', e => addClicker(e, name, input))
    document.addEventListener('click', e => allClicker(e, name, input, add))
}

function addClicker(e, name, input) {
    e.stopPropagation();

    // if (input.value !== '') {
    //     data[name].push(input.value);
    //     // PUT();
    // }

    console.log('add');
    console.log(data);
}
function inputClicker(e) {
    e.stopPropagation();
    console.log('input');
}
function allClicker(e, name, input, add) {
    if (e.target !== input && e.target !== add) {
        input.removeEventListener('click', inputClicker);
        add.removeEventListener('click', addClicker);
        this.removeEventListener('click', allClicker);

        if (input.value !== '') {
            data[name].push(input.value);
            PUT();
        }
        else {
            let inner = '';
            data[name].map((i, index) => inner += item(i, index, name));
            document.querySelector(`#${name}`).innerHTML = inner;
        }

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