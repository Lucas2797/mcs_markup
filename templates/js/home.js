

function Fetching() {
    if (o1.value != '' || o1.value != null && o2.value != '' || o2.value != null) {
        var url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados?formato=json&dataInicial=01/${Rearrange(o1.value)}&dataFinal=01/${Rearrange(o2.value)}`
        fetch(url)
            .then(response => response.json())
            .then(json => CreatingTable(json))
    }
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function SendingData(json) {
    var requestin = new XMLHttpRequest()
    requestin.open("POST", "{% url 'home' %}")
    requestin.setRequestHeader("Content-Type", "application/json")
    requestin.setRequestHeader("X-CSRFToken", getCookie('csrftoken'))
    requestin.send(JSON.stringify(json))
    alert("Periodo salvo em : <br> https://mcsmarkup.herokuapp.com/ipca/home/")
}


function CreatingTable(json) {
    var table = document.getElementById('tbody');
    table.innerHTML = ''
    for (var o in json) {
        var object = json[o]
        var line = document.createElement("tr")
        var cel_1 = document.createElement("td")
        var cel_2 = document.createElement("td")
        cel_1.innerHTML = object.data
        line.appendChild(cel_1)
        cel_2.innerHTML = object.valor
        line.appendChild(cel_2)
        table.appendChild(line)
    }
    var button = document.createElement('button')
    button.innerHTML = "Salvar Periodo"
    button.style = "margin-left: 46%;"
    button.addEventListener('click', function () { SendingData(json) })
    var div_but = document.getElementById('div_but')
    div_but.innerHTML = ''
    div_but.appendChild(button)
}

function Rearrange(month) {
    var result = `${month[5]}${month[6]}/${month[0]}${month[1]}${month[2]}${month[3]}`
    return result
}

var o1 = document.getElementById('start');
var o2 = document.getElementById('end');

o2.addEventListener('change', function () { Fetching() });





