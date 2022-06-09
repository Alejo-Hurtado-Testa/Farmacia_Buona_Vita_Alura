var pacientes = document.querySelectorAll(".paciente"); // TRAEMOS CLASE PACIENTE PARA PODER TRAER LAS DEMAS COSAS. PARA SELECCIONAR A TODOS LOS QUE TENGAN LA MISMA CLASE USAMOS EL "querySSelectorAll". 

for (var i = 0; i < pacientes.length; i++) {
    var paciente = pacientes[i]; // ACA LE ESSTABLECEMOS LA LISTA QUE SUSTRAEMOS DE PACIENTES PARA PODER ITERAR SOBRE CADA PACIENTE, POR ESO PONEMOS "i", PARA QUE LA POSICION SEA LA QUE ESTE EN ESE MOMENTO DE LA ITERACION. 

    var tdPeso = paciente.querySelector(".info-peso"); // PODEMOS SELECCIONAR UNA CLASE DENTRO DE LA CLASE PADRON. 
    var peso = tdPeso.textContent; // ESTO SELECCIONA EL CONTENIDO DEL TEXTO, NO TODO EL CODIGO.

    var tdAltura = paciente.querySelector(".info-altura");
    var altura = tdAltura.textContent;

    var tdIMC = paciente.querySelector(".info-imc");

    pesoEsValido = validarPeso(peso);
    alturaEsValida = validarAltura(altura);

    if (!pesoEsValido) { // ESTAMOS NEGANDO QUE LA ALTURA SEA VALIDA PARA QUE CUANDO SEA INCORRECTA ENTRE AL IF.

        console.log("Peso incorrecto");
        tdIMC.textContent = "Peso incorrecto";
        pesoEsValido = false;
        paciente.classList.add("paciente-incorrecto"); // ACA ESTAMOS DICIENDO QUE ME ASOCIE, LA CLASE 'PACIENTE-INCORRECTO', CON LA CLSE PACIENTE PARA QUE PUEDA CAMBIAR DE COLOR MEDIANTE EL CODIGO CSS Y NO CAMBIAR ESTE DE JS.
    }

    if (!alturaEsValida) {
        console.log("Altura incorrecto");
        tdIMC.textContent = "Altura incorrecta";
        alturaEsValida = false;
        paciente.classList.add("paciente-incorrecto");
    }

    if (pesoEsValido && alturaEsValida) {
        tdIMC.textContent = calcularIMC(peso, altura); // ACA REUTILIZAMOS LA FUNCION QUE HEMOS CREANDO PARA EL CALCULO DEL IMC.
    }
}

function calcularIMC(peso, altura) { // ENCAPSULAMOS EL CALCULO DEL IMC DENTRO DE UNA FUNCION PARA PODER REUTILIZARLA.
    
    var imc = peso / (altura * altura);
    return imc.toFixed(2); // LA FUNCION ".toFixed" SIRVE PARA REDONDEAR LOS DECIMALESSS TANTO CUANTO QUERRAMOS, EN ESTE CASO, 2 DECIMALES DESPUESS DEL PUNTO.
};

function validarPeso(peso) {
    if (peso > 0 && peso < 300) {
        return true;
    } else {
        return false;
    }
};

function validarAltura(altura) {
    if (altura > 0 && altura < 3.00) {
        return true;
    } else {
        return false;
    }
}