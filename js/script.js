/*
    DESCRIZIONE DEL GIOCO

    Il computer deve generare 16 numeri casuali nello stesso range della difficltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell'array delle bombe non potranno esserci due numeri uguali
    In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati abbiamo calpestato una bomba. La cella si colora di rosso e la partita termina. Altrimenti, la cella cliccata si colora di azzurro e l'utente può continuare  a cliccare sulle altre celle.
    LA partita termina quando il giocatore clicca su una bomba o quando raggiunger il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
    Al termine della partita, il software deve comunicare il punteggio, cioè il numero di volte che l'utente ha cliccato su una cella che non era una bomba

    # MILESTONE 1
    Prepariamo "Qualcosa" per tenere il punteggio dell'utente.
    Quando l'utente clicca su una cella, incrementiamo il punteggio.
    Se riusciamo, facciamo anche in modo da non poter più cliccare sulla stessa cella

    # MILESTONE 2
    Facciamo in modo di generare 16 numeri casuali (tutti diversi) compresi tra 1 e il massimo di caselle disponibili.
    Generiamoli e stampiamo in console per essere certi che siano corretti

    # MILESTONE 3
    Quando l'utente clicca su una cella, verrifichiamo se ha calpestato una bomba, controllando se il numero di cella è presente nell'array di bombe.
    Se si, la cella diventa rossa (raccogliamo il punteggio e scriviamo in console che la patita termina) altrimenti diventa azzurra e dobbiamo incrementare il punteggio.

    # MILESTONE 4
    Quando l'utente clicca su una cella, e questa non è una bomba, dobbiamo controllare se il punteggio incrementato ha raggiunto l punteggio massimo, perchè in quel caso la partita termina. Raccogliamo quindi il messaggio e scriviamo un messaggio appropriato.
    
    # MILESTONE 5
    Quando la partita termina dobbiamo capire se è terminata perchè è stata cliccata una bomba o seperchè l'utente ha raggiunto il punteggio massimo(ossia ha vinto). Dobbiamo poi in ogni caso stampare lin pagina il punteggio raggiunto ed il messaggio adeguato in caso di vittoria o sconfitta.
    
    # BONUS
    Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà (come le istruzioni di ieri se non già fatto)
    
    # SUPERBONUS
    Colorare tutte le celle bomba quando la partita finisce
    Consigli del giorno
    approcciate l'esercizio con serenità, e cercate di divertirvi!
    Cercate di commentare e usare i console.log il più possibile
    Fatevi sempre delle domande: sto ripetendo del codice? Questa funzione fa troppe cose? Il nome ha senso rispetto a quello che fa?


*/



const btnPlayed = document.querySelector('.play');
const difficult = document.getElementById('difficult');
const flexGrid = document.querySelector('.flex-grid');

btnPlayed.addEventListener('click',
    () => {
        
        flexGrid.innerHTML = '';

        
        const gridDimension = difficult.value;
        let cellsNumber;
        let cellsPerSide;

        // switch case
        switch (gridDimension) {
            case '1':
                cellsNumber = 100;
                cellsPerSide = 10;
                break;
            case '2':
                cellsNumber = 81;
                cellsPerSide = 9;
                break;
            case '3':
                cellsNumber = 49;
                cellsPerSide = 7;
        }

        // 
        const grid = document.createElement('div');
        grid.classList.add('grid');

        
        const bombs = [];
        for (let i = 0; i < 16; i++) {
            let bomb = 0;
            do {
               bomb = genRandomNumber(1, cellsNumber);
            } while (bombs.includes(bomb))
            bombs.push(bomb);
        }

        //credo variabile bombe
        const attempts = [];
        const maxAttempts = cellsNumber - bombs.length;

        
        for (let i = 1; i <= cellsNumber; i++) {
            
            const square = createGridSquare (i, cellsPerSide);

            square.addEventListener('click', 
                function () {
                    handleSquareClick (square, bombs, attempts, maxAttempts );
                }
            );
                        
            //aggiungo a grid lao square 
            grid.append(square);
        }

         // Inserisco grid
         flexGrid.append(grid);
    }
);



/*
    ----- FUNZIONE ----
*/

// Creo grid sqyare
function createGridSquare (num, cells) {
    //creo nodo 
    const node = document.createElement('div');
    node.classList.add('square');
    node.style.width = `calc(100% / ${cells})`;
    node.style.height = `calc(100% / ${cells})`;

    node.append(num);

    return node;
}

function genRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function handleSquareClick (square, bombs, attempts, maxAttempts ) {
    const number = parseInt(square.innerHTML);
    if (bombs.includes(number)) {
        endGame (bombs, attempts, maxAttempts)
    }
    else if (!attempts.includes(number)) {
        square.classList.add('safe');
        attempts.push(number);

        if (attempts.length === maxAttempts) {
            endGame (bombs, attempts, maxAttempts)
        }
    }
}

function endGame (bombs, attempts, maxAttempts) {
    const allSquares = document.getElementsByClassName('square');
    for (let i = 0; i < allSquares.length; i++) {
        if (bombs.includes(parseInt(allSquares[i].innerHTML)))
        {
            allSquares[i].classList.add('bomb');
        }
    }

    let message = `Complimenti hai vinto! Hai indovinato i ${maxAttempts} tentativi validi. Gioca ancora...`;

    if (attempts.length < maxAttempts) {
        message = `Peccato hai perso :(  hai indovinato ${attempts.length} tentativi. Gioca ancora...`
    }

    const messageEl = document.createElement('div');
    messageEl.classList.add('message');
    messageEl.append(message);

    document.querySelector('.flex-grid').append(messageEl);

    document.querySelector('.grid').classList.add('end-game');
}


