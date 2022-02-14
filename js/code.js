const heshMas = [
      [['фотосессиявмоскве', 'фотосессиянаприроде', 'фотоконтент', 'фотомосква', 'фотосъёмка', 'портретнаясъемка',
'портретнаяфотосессия', 'портретныйфотограф', 'лучшеефото', 'фотопрогулкамосква', 'фотодень', 'фотоденьмосква', 
'фотосессиявмоскве', 'уличнаяфотосессия', 'мирмоимиглазами', 'студийнаяфотосессия', 'kudago'],
      ['фоточка', 'фотосессиимосква', 'фотосессиявстудии', 'фотоконтентмосква', 'фотосъемкамосква', 'фотосъемкавмоскве', 
'фотосъемки', 'фотосетмосква', 'портретнаясъёмка', 'портретнаяфотография', 'портретныйфотографмосква', 'портретноефото', 
'фоточка', 'интересныефото', 'всеомоскве', 'контентфотограф'],
      ['топфотографы', 'тофотографмосква', 'фотоконтентдляинстаграм', 'фотосъемкивмоскве', 'фотосъемкимосква', 
'портретнаясъемкамосква', 'портретнаяфотосессиямосква', 'портретноефотомосква',  'фотовпарке', 'съемкавстудии', 
'выезднаяфотосессия', 'фотостудиявмоскве', 'фотоднимосква', 'cтудияфото', 'фотографдлядевушек'],
      ['zababurinph', 'ятопфотограф']],
      
      [['хэш1'], 
      ['хэш2'], 
      ['хэш3'], 
      ['хэш4']]
      ];

constHeshN = 3, constHeshS = 10, constHeshV = 7;

var s = document.getElementById("selectUser").options.selectedIndex;

let a = document.getElementById("heshN");
heshMas[s][0].forEach(e => a.innerHTML += "#" + e + "<br>");

let b = document.getElementById("heshS");
heshMas[s][1].forEach(e => b.innerHTML += "#" + e + "<br>");

let c = document.getElementById("heshV");
heshMas[s][2].forEach(e => c.innerHTML += "#" + e + "<br>");

let m = document.getElementById("heshM");
heshMas[s][3].forEach(e => m.innerHTML += "#" + e + "<br>");

let d = document.querySelector('textarea');

function changeUser() {
    s = document.getElementById("selectUser").options.selectedIndex;

    a.innerHTML = ''; b.innerHTML = ''; c.innerHTML = ''; m.innerHTML = ''; d.innerHTML = '';

    heshMas[s][0].forEach(e => a.innerHTML += "#" + e + "<br>");
    heshMas[s][1].forEach(e => b.innerHTML += "#" + e + "<br>");
    heshMas[s][2].forEach(e => c.innerHTML += "#" + e + "<br>");
    heshMas[s][3].forEach(e => m.innerHTML += "#" + e + "<br>");
}

document.getElementById("em1").innerHTML = "По умолчанию: " + constHeshN;
document.getElementById("em2").innerHTML = "По умолчанию: " + constHeshS;
document.getElementById("em3").innerHTML = "По умолчанию: " + constHeshV;

function addArr (arr, len) {
    let res = []

    for (var i = 0; i < len; i++) {
        res.push(arr[i]);
    }

    return res;
}

function shuffle(arr) {
    let j;

    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return(arr);
}

function generate() {
    inputHeshN = document.querySelector('.countHeshN');
    inputHeshS = document.querySelector('.countHeshS');
    inputHeshV = document.querySelector('.countHeshV');
    
    evalHeshN = eval(inputHeshN.value) == undefined ? constHeshN : eval(inputHeshN.value);
    evalHeshS = eval(inputHeshS.value) == undefined ? constHeshS : eval(inputHeshS.value);
    evalHeshV = eval(inputHeshV.value) == undefined ? constHeshV : eval(inputHeshV.value);
    
    let result = heshMas[s][3], temp = [];
    let j;

    if (evalHeshN > heshMas[s][0].length || evalHeshS > heshMas[s][1].length || evalHeshV > heshMas[s][2].length) {
        alert('Количество выходит за пределы диапазона');
        return;
    }

    temp = addArr(heshMas[s][0], heshMas[s][0].length);
    temp = shuffle(temp);
    temp = addArr(temp, evalHeshN);
    result = result.concat(temp);
    temp = [];

    temp = addArr(heshMas[s][1], heshMas[s][1].length);
    temp = shuffle(temp);
    temp = addArr(temp, evalHeshS);
    result = result.concat(temp);
    temp = [];

    temp = addArr(heshMas[s][2], heshMas[s][2].length);
    temp = shuffle(temp);
    temp = addArr(temp, evalHeshV);
    result = result.concat(temp);

    d.innerHTML = '';
    result.forEach(e => d.innerHTML += "#" + e + " ");
}