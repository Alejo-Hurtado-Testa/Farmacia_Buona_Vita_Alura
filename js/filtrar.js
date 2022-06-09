var campoFiltro = document.querySelector("#filtrar-tabla");
campoFiltro.addEventListener("input", function(){

    var pacientes = document.querySelectorAll(".paciente"); //TRAEMOS A TODOS LOS PACIENTES EN UN ARRAY.

    if (this.value.length > 0) { //SI EN LA CAJA DE TEXTO HAY VALORES, OSEA TAMAÑO DEL ARRAY MAYOR A CERO..
        for(var i = 0; i < pacientes.length; i++) { // ITERAMOS CON CADA UNO DE LOS PACIENTES.
            var paciente = pacientes[i]; //CADA ELEMENTO DEL ARRAY ES UN PACIENTE.

            var tdNombre = paciente.querySelector(".info-nombre"); // DEL ELEMENTO PACIENTE SELECCIONAMOS A LA CLASE NOMBRE.

            var nombre = tdNombre.textContent; // EN LA CLASE NOMBRE, SELECCIONAMOS EN CONTENIDO DE DICHA CLASE.

            var expresion = new RegExp(this.value, "i"); //EN ESTA VARIABLE LO QUE HACEMOS ES OPERAR CON UNA "NUEVA" FUNCION QUE ES EL "REGULAR EXPRESION", LA MISMA RECIBE DOS PARAMETROS, EN ESTE CASO RECIBE EL VALOR DE NUESTRA CAJA DE TEXTO (EL TEXTO QUE INGRESAMOS) Y UNA "I", ESTO ES PARA QUE NO DISCIMINE SI LO QUE ESTA DENTRO DE LA CAJA SE ESCRIBIO CON MAYUSCULA O MINUSCULA.

            if (!expresion.test(nombre)) { // QUIERO QUE ME "TESTEE" LA EXPRESION PARA VER SI COINCIDE CON EL NOMBRE DADO, OSEA, QUE ME PRUEBE EL TEXTO. SI NUESTRA EXPRESION "NO" ES IGUAL QUE EL NOMBRE O NO ESTA DENTRO DEL NOMBRE.. (CON EL SIGNO "!" ESTAMOS INVIRTIENDO EL VALOR DE LA EXPRESION BOOLEANA). 
                
                paciente.classList.add("invisible"); //AL PACIENTE ADICIONALE LA CLASE INVISIBLE PARA NO MOSTRARLO..
            } else {
                paciente.classList.remove("invisible");//SINO, REMOVEME LA CLASE INVISIBLE DEL PACIENTE PARA QUE SE VEA.
            }
        }
    } else { // SI NO HAY NADA ESCRITO..
        for(var i = 0; i < pacientes.length; i++) { // VOLVEMOS A HACER VISIBLE A TODOS LOS PACIENTES..
            var paciente = pacientes[i];
            paciente.classList.remove("invisible"); //ELIMINANDOLES LA CLASE "INVISIBLE".
        }
    }
});


/*

Como el primer parámetro es el inicio, y queremos comparar desde el inicio de la string nombre, vamos a utilizar como inicio el valor 0, o sea, siempre a partir del primer carácter. ¿Pero cuál sería el fin? El fin es justamente el tamaño del valor digitado:

nombre.substring(0, this.value.length);

Podemos guardar esa string en una variable y compararla con lo que está siendo digitado. En caso de ser falso, adicionamos la clase invisible, caso contrario, la removemos.

var comparar = nombre.substring(0, this.value.length);
if(!(this.value == comparar)){
paciente.classList.add("invisible");
} else {
paciente.classList.remove("invisible");
}

¿Pero qué pasa con la distinción en letras minúsculas y mayúsculas? En este caso, va a haber diferenciación entre minúsculas y mayúsculas. Para resolver eso, antes de realizar la comparación, podemos colocar las dos strings en minúsculas usando toLowerCase(), para recién efectuar la comparación.

var comparar = nombre.substring(0, this.value.length);
var compararMinuscula = comparar.toLowerCase();
var valorDigitadoMinuscula = this.value.toLowerCase();
if(!(valorDigitadoMinuscula  == compararMinuscula )){
paciente.classList.add("invisible");
} else {
paciente.classList.remove("invisible");
}

Esta es una alternativa de implementar la misma funcionalidad sin expresión regular, sin embargo, requiere de más código y preocuparnos por otros detalles. Pero es otra opción para añadir en nuestros conocimientos de JavaScript.

*/