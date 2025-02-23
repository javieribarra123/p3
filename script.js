let score = 0;

async function fetchQuestion() {
    const web = await fetch('https://restcountries.com/v3.1/all');
    const datos = await web.json();

    let pais_correcto = datos[Math.floor(Math.random() * datos.length)];
    let paises = [pais_correcto];

    while (paises.length < 4) {
        let pais_random = datos[Math.floor(Math.random() * datos.length)];
        if (!paises.includes(pais_random)) {
            paises.push(pais_random);
        }
    }

    paises = paises.sort(() => Math.random() - 0.5);

    document.getElementById('bandera').src = pais_correcto.flags.png;
    document.getElementById('opciones_paises').innerHTML = '';

    paises.forEach(pais => {
        let button = document.createElement('button');
        button.textContent = pais.name.common;
        button.onclick = () => checkAnswer(pais, pais_correcto);
        document.getElementById('opciones_paises').appendChild(button);
    });
}

function checkAnswer(elegido, correcto) {
        if (elegido.name.common === correcto.name.common){
            document.getElementById('resultado').textContent = "Correct!";
            score++;
        }
        else{
            document.getElementById('resultado').textContent = 'Incorrect, right answer was ' + correcto.name.common;
            score = 0;
        }
    document.getElementById('score').textContent = score;
}

document.addEventListener('DOMContentLoaded', fetchQuestion);
