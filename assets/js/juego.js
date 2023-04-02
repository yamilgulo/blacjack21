// 2C = 2 Cluster osea 2 de Trebol
// 2D = 2 Diamonds osea 2 de Diamantes
// 2H = 2 Hearts osea 2 de Corazones
// 2S = 2 Spades osea 2 de Espadas

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias del HTML
const btnPedir          = document.querySelector('#btnPedir');
const puntosHTML        = document.querySelectorAll('small');
const jugadorCartas     = document.querySelector('#jugador-cartas');
const computadoraCartas = document.querySelector('#computadora-cartas');
const btnNuevo          = document.querySelector('#btnNuevo');
const btnDetener        = document.querySelector('#btnDetener');

// Esta funcion crea una nueva baraja
const crearDeck = () => {
    
    for( let i = 2; i <= 10 ; i++){
        for( let tipo of tipos ){
            deck.push( i + tipo );
        }    
    }

    for (let especial of especiales) {
        for( let tipo of tipos ){
            deck.push( especial + tipo );
        }
    }

    //Para barajear las cartas al azar en el arreglo
    deck = _.shuffle(deck);

    console.log( deck );

    return deck;
}

crearDeck();


// La carta debe ser de la baraja, pero al escogerla hay que borrarla del arreglo
const pedirCarta = () => {

    if ( deck.length === 0){
        throw 'No hay cartas en el deck';
    }
    const cartaEscogidaAlAzar = deck.shift();

    return cartaEscogidaAlAzar;
}

// Juega automaticamente la computadora
const turnoComputador = () => {
    let jugadorConMasDe21 = false;

        if(puntosComputadora <= puntosJugador){
            const carta = pedirCarta();

            puntosComputadora += valorCarta(carta);

            puntosHTML[1].innerHTML = puntosComputadora;

            console.log({puntosComputadora});
        
            //Mostrar carta
            
                //Creacion de una imagen de la carta via DOM
                const creaImagenCarta = document.createElement('img');

                //Le agregamos a la imagen la clase 'carta' para usar CSS
                creaImagenCarta.classList.add('carta');

                //Buscamos la imagen de la carta y la colocamos en el src

                creaImagenCarta.src = `assets/cartas/${carta}.png`;

                //Insertamos la carta y especificamos donde

                computadoraCartas.append(creaImagenCarta);

            if (puntosJugador > 21){
                setTimeout(function() {
                    alert('Perdió! Gana Computadora');
                }, 1000);
                jugadorConMasDe21 = true;
            }
        }    
            

        //Validar puntos de la PC

        //Si la PC pasa los 21 automaticamente pierde
        if(jugadorConMasDe21 == false){
            setTimeout(function() {
                if (puntosComputadora > 21){
                    alert('Felicidades, ganaste!!!');
                    btnNuevo.disabled = false;
                }
                
                //Unico caso de empate, si ambos tienen 21
                if(puntosComputadora === puntosJugador && puntosComputadora == 21){
                    alert('Empate, ambos tienen 21!!!');
                    btnNuevo.disabled = false;
                } 
                
                //Computadora supera a jugador
                if(puntosComputadora > puntosJugador && puntosComputadora <= 21){
                    alert('Perdió! Gana Computadora');
                    btnNuevo.disabled = false;
                }
                
                if(puntosComputadora <= puntosJugador && puntosComputadora!==21){
                    turnoComputador();
                }
            }, 1000);  
        }
}

// Saber el valor de la carta que pedi
const valorCarta = ( carta ) => {

    //Se usa carta.length - 1 porque puede salir 10D por ejemplo
    let valor = carta.substring(0, carta.length - 1) ;

    //Retorno si es una letra o un numero
    return ( isNaN(valor) ) ?
        // Los Ases valen 11, J,Q,K vale 10
        ((valor === 'A') ?
            valor = 11 
        : 
            valor = 10)
        
        :
        //Entonces es un numero
            valor *= 1;

    //Ahora, como el valor esta en string, al sumar los valores
    //nos va a dar problemas por ejemplo 5 + 6 = 11, pero al ser
    //strings va a dar 5 + 6 = 56, entonces para convertirlo a numeros,
    //podemos multiplicarlo * 1

}


// Eventos para escuchar
btnPedir.addEventListener('click', function() {

    const carta = pedirCarta();

    puntosJugador += valorCarta(carta);

    puntosHTML[0].innerHTML = puntosJugador;
 
    //Mostrar carta
        //Creacion de una imagen de la carta via DOM
        const creaImagenCarta = document.createElement('img');

        //Le agregamos a la imagen la clase 'carta' para usar CSS
        creaImagenCarta.classList.add('carta');

        //Buscamos la imagen de la carta y la colocamos en el src

        creaImagenCarta.src = `assets/cartas/${carta}.png`;

        //Insertamos la carta y especificamos donde

        jugadorCartas.append(creaImagenCarta);

    //Validar puntos y bloquear botones

    if (puntosJugador > 21){
        console.log({puntosJugador});
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        
        //Turno de PC
        turnoComputador();
    }
        

})

btnNuevo.addEventListener('click', function() {

    //Vaciamos el mazo y creamos otro
    deck = [];
    crearDeck();

    //Reseteamos los puntos de los jugadores en cero
    puntosJugador = 0;
    puntosComputadora = 0;

    //Reseteamos los puntos visualmente de los jugadores en cero
    puntosHTML[0].innerHTML = puntosJugador;
    puntosHTML[1].innerHTML = puntosComputadora;

    //Borramos el valor dentro del div de las cartas de los jugadores
    jugadorCartas.innerHTML = '';
    computadoraCartas.innerHTML = '';
    
    //Volvemos a habilitar el boton de pedir
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    btnNuevo.disabled = false;
})

btnDetener.addEventListener('click', function() {

    btnPedir.disabled = true;
    btnDetener.disabled = true;
    btnNuevo.disabled = true;
    turnoComputador();
})