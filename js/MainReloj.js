"use strict"

const canvas = document.getElementById('clock');
const ctx = canvas.getContext('2d');

let radio = canvas.width/2; //radio valor para ubicar el centro del círculo


function updateClock() {

    // - Reloj dibujo y estilo
    // - ----------------------
ctx.beginPath();
ctx.fillStyle = "RGB(225,225,225)";              // selección de relleno gris 
ctx.arc(radio, radio, radio, 0, 2 * Math.PI);   // dibuja un arco de radio igual al radio inicializado en linea 6, ubicado a una distancia del vértice izquierdo superior igual a la media de radioX, radioY
ctx.fill();                                     //dibuja y rellena enn canvas

ctx.beginPath();
ctx.fillStyle = "black";                        //seleccion relleno negro
ctx.arc(radio, radio, 4 , 0 , 2 * Math.PI);     // dibuja arco de 4 px de radio ubicado a una distancia del vértice izquierdo superior igual a la media de radioX, radioY
ctx.fill();

ctx.font = radio/14 + "px Comic Sans MS";        //selección de tamaño proporcional al radio en px y  tipo de letra
ctx.textAlign = "center";                           //alineación horizontal:  relativa al valor x del método fillText()
ctx.textBaseline='middle';                          // línea de texto se ubica en el centro
for (var i=1; i<=12; i++) {                         //for para dibujar los números respecto de 360ª
    ctx.fillText(i,  radio + radio * 0.9 * Math.sin (i * 2 * Math.PI / 12), radio - (radio * 0.9 * Math.cos (i * 2 *Math.PI / 12)));  //dibuja los  12 números  en el canvas. 
}


// - Actualizar la hora al subir o refrescar la página
// - --------------------------------------------------
const date = new Date();

const hours = date.getHours();  // solicita hora actual
const minutes = date.getMinutes(); // soliciata minuto actual
const seconds = date.getSeconds(); // solicita segundo actual



const completeHour =hours % 12 + minutes / 60 + seconds / 3600; //expresión de la hora  en función de hora 

const hourRotation = (completeHour * 2 * Math.PI / 12) ; //rota la aguja de hora a la posición correspondiente
const minuteRotation = (minutes * 2 * Math.PI  / 60);   //rota la aguja la minutos
const secondRotation = (seconds * 2 * Math.PI / 60) ;   //rota la aguja segundos


// -  Agujas:  dibujo y estilos 
// - --------------------------

// - Aguja hora
// - -----------
ctx.strokeStyle = "rgb(28, 49, 28)"; //color de la aguja hora
ctx.moveTo(radio, radio);           //maraca  un punto en el canvas (centrado en el centro de gravedad del div cuadrado )
ctx.lineTo(radio + radio * 0.4 * Math.sin(hourRotation), radio - (radio * 0.4 * Math.cos(hourRotation))); //agrega un nuevo punto en canvas y crea una linea haia el cual se dirije el punto anterior -radio*0.4 determina la longitud final de la aguja cuando se dibuje
ctx.lineWidth = 7;  //ancho de la aguja horas
ctx.stroke();   //dibuja la línea(aguja horas)


// - Aguja minutos
// - --------------
ctx.moveTo(radio, radio);   //marca  un punto en el canvas (centrado en el centro de gravedad del div cuadrado)
ctx.lineTo(radio + radio * 0.6 * Math.sin(minuteRotation), radio - (radio * 0.6 * Math.cos(minuteRotation))); //agrega un nuevo punto en canvas y crea una linea haia el cual se dirije el punto anterior
ctx.lineWidth = 7;  //ancho de la aguja hora
ctx.lineWidth = 4; //ancho de la aguja minutos
ctx.stroke();   //dibuja la línea(aguja minutos)


// - Aguja segundos
// - ---------------
ctx.beginPath();            //inicia un nuevo camino para cambiar el color solo a la aguja segundos
ctx.moveTo(radio, radio);     //centro de rotación
ctx.lineTo(radio + radio * 0.8 * Math.sin(secondRotation), radio - (radio * 0.8 * Math.cos(secondRotation))); 
ctx.strokeStyle = " red"; //color de la aguja segundos
ctx.lineWidth = 2;        //ancho de la aguja segundos
ctx.stroke();           //dibuja la línea(aguja segundos)


ctx.beginPath();                                //inica un nuevo camino para realizar el circulo central que tapa el inicio de las agujas
ctx.fillStyle = "black";                        //seleccion relleno negro
ctx.arc(radio, radio, 6 , 0 , 2 * Math.PI);     // dibuja arco de 6px de radio ubicado a una distancia del vértice izquierdo superior igual a la media de radioX, radioY
ctx.fill();                                     //tapa los inicios de las agujas 

}

// - Llamado a updateClock() cada 1 segundo (1000 ms = 1s)
setInterval(updateClock,  1000);