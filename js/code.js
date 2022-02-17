export const btnClick = (data) => {
    let countHash = {
        high: document.querySelector('#countHigh').value,
        mid: document.querySelector('#countMid').value,
        low: document.querySelector('#countLow').value
    }

    for (let key in countHash) {
        if (countHash[key] === '' || countHash[key] < 0) {
            alert(`Error: ошибка в заполнении`)
            return;
        };
    }

    for (let key in countHash) {
        if (data[key].length < countHash[key]) {
            alert(`Error: тэгов меньше, чем введенное число`)
            return;
        };
    }

    generate(data, countHash);
}

function shuffle(arr) {
    let j;

    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return (arr);
}

function generate(data, countHash) {
    let result = data.main;
    result = result.concat(shuffle(data.high).slice(0, countHash.high));
    result = result.concat(shuffle(data.mid).slice(0, countHash.mid));
    result = result.concat(shuffle(data.low).slice(0, countHash.low));
    
    document.querySelector('#textarea').innerHTML = '';
    result.forEach(e => document.querySelector('#textarea').innerHTML += "#" + e + " ");
}