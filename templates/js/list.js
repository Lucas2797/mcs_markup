function Fetching() {
    var url = "{% url 'listing' %}"
    fetch(url)
        .then(response => response.json())
        .then(json => CreatingTable(json))
}


function CreatingTable(json) {
    var table = document.getElementById('tbody');
    table.innerHTML = ''
    for (var o in json) {
        var object = json[o]
        var line = document.createElement("tr")
        var cel_1 = document.createElement("td")
        var cel_2 = document.createElement("td")
        var cel_3 = document.createElement("td")
        var cel_4 = document.createElement("td")
        cel_1.innerHTML = object.date
        cel_2.innerHTML = object.valor
        cel_3.innerHTML = object.acumulado_ano
        cel_4.innerHTML = object.acumulado_meses
        line.appendChild(cel_1)
        line.appendChild(cel_2)
        line.appendChild(cel_3)
        line.appendChild(cel_4)
        table.appendChild(line)
    }
    var button = document.createElement('button')
    button.innerHTML = "Deletar Todos"
    table.appendChild(button)
    button.addEventListener('click', function () { SendingDelete() })
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

function SendingDelete(arg = null) {
    var requestin = new XMLHttpRequest()
    var url = "{% url 'list' %}"
    requestin.open("DELETE", url)
    requestin.setRequestHeader("X-CSRFToken", getCookie('csrftoken'))
    requestin.send()
}



Fetching()