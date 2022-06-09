var botonAdicionar = document.querySelector("#adicionar-paciente");

botonAdicionar.addEventListener("click", function(event){ // USAMOS UNA FUNCION ANONIMA, LO QUE SIGNIFICA QUE NO VA A TENER NOMBRE Y SE USA PARA AHORRAR CODIGO Y MAS ENTENDIBLE.

    event.preventDefault(); // PREVENIMOS EL COMPORTAMIENTO PADRON CON ESTE METODO, EL COMPORTAMIENTO ERA CARGAR LA PAGINA, CON ESTO YA NO HARA ESO.

    var form = document.querySelector("#form-adicionar");
    var paciente = capturarDatosPaciente(form);
    
    var errores = validarPaciente(paciente);
    if (errores.length > 0) {
        exhibirMensajesErrores(errores);
        return; // COLOCANDO UN "RETURN" VACIO, LE ESTAMOS PASANDO JUSTAMENTE ESO, ES COMO USAR UN "BREAK", HACE REFERENCIA A LA FUNCION ANONIMA Y NO INGRESA DATOS A LA TABLA, ES DECIR, ESTA CORTANDO LA FUNCION ANONIMA.
    }; 

    adicionarPacienteEnLaTabla(paciente); // LLAMAMOS A LA FUNCION DESPUES DE TODA LA VALIDACION PARA PODER ADICIONAR EL PACIENTE MEDIANTE LA FUNCION.

    form.reset(); // UNA VEZ QUE INGRESAMOS LOS DATOS, RESETEAMOS LOS CUADROS DE INFORMACION DEL FORMULARIO PARA OTRA NUEVA ENTRADA.

    var mensajesErrores = document.querySelector("#mensajes-errores");
    mensajesErrores.innerHTML = ""; // ACA SI ESTAMOS RECETEANDO LOS MENSAJES CUANDO PULSAMOS EL BOTON ADICIONAR O HAYA ALGUN ERROR EN EXHIBICION.

});

function adicionarPacienteEnLaTabla(paciente) { // CREAMOS UNA FUNCION PARA ENCAPSULAR EL ADICIONAMIENTO DE PACIENTES PARA PODER USARLO EN ESTE ARCHIVO Y CON EL AJAX.

    var pacienteTr = construirTr(paciente);
    var tabla = document.querySelector("#tabla-pacientes"); // TRAEMOS LA CLASE DESDE HTML.

    tabla.appendChild(pacienteTr); // A LA CLASE QUE TRAJIMOS, APLICAMOS LA MISMA LOGICA, A LA "tabla" LE ASIGNAMOS EL HIJO "pacienteTr" QUE A SU VEZ CONTIENE EN SUS HIJOS LA INFORMACION DE PESO, ALTURA, ETC., (nietos de "tabla") Y AHORA ESTO SI CREARA OTRA FILA CON LAS RESPECTIVAS COLUMNAS, UNA DEBAJO DE LA OTRA.
};

function capturarDatosPaciente(form) {
    // captura los datos del formulario:
    var paciente = { // CREAMOS UNA CLASE PARA CAPTURAR Y RETORNAR EL VALOR DE NUESTRAS VARIABLES.
        nombre: form.nombre.value, // ACA ACCEDEMOS AL VALOR DE LO QUE EL USUARIO INGRESA EN EL FORMULARIO.
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calcularIMC(form.peso.value, form.altura.value) // ACA REUTILIZAMOS LA FUNCION DEL OTRO ARCHIVO PARA PODER PASARLE EL VALOR DEL CALCULO Y ASI AGREGAR LA ULTIMA COLUMNA QUE NOS FALTA.
    }
    return paciente;
};

function construirTr(paciente) {
    var pacienteTr = document.createElement("tr"); // PARA PODER CREAR ETIQUETAS DESDE JS, USAMOS, DENTRO DEL DOCUMENT, LA ".createElement()" ESTO LO QUE HACE ES CREAR UNA ETIQUETA NUEVA, DEPENDE DE LA ETIQEUTA QUE LE PASEMOS EN LOS PARENTECIS. (SOLO CREAMOS LAS ETIQUETAS).

    pacienteTr.classList.add("paciente");

    // asignacion de los TDs al TR correspondiente y a la tabla el TR:
    pacienteTr.appendChild(construirTd(paciente.nombre, "info-nombre")); // "appendChild" ESTA FUNCION LO QUE HACE ES ASIGNAR HIJOS, ES DECIR, TOMA ESTE ELEMENTO, TE LO ASOCIO PARA QUE SEA PARTE DE VOS, ES DECIR, PACIENTE ES EL PADRE Y LOS ELEMENTOS QUE LE ASOCIAMOS SON LOS HIJOS. ACA USAMOS NUESTR FUNCION PARA PODER AGREGAR LOS HIJOS, PASANDOLE EL DATO Y EL NOMBRE DE LA CLASE QUE QUEREMOS.

    pacienteTr.appendChild(construirTd(paciente.peso, "info-peso"));
    pacienteTr.appendChild(construirTd(paciente.altura, "info-altura"));
    pacienteTr.appendChild(construirTd(paciente.gordura, "info-gordura"));
    pacienteTr.appendChild(construirTd(paciente.imc, "info-imc"));

    return pacienteTr;
};

function construirTd(dato, clase) {
    var td = document.createElement("td");
    td.classList.add(clase); // ADICIONAMOS LA CLASE QUE ESTAMOS RECIBIENDO AL TD QUE CREAMOS.

    td.textContent = dato; // AGREGAMOS E DATO QUE ESTAMOS RECIBIENDO PARA PONERLO COMO CONTENIDO.

    return td; 
};

function validarPaciente(paciente) {
    var errores = [];
    if (paciente.nombre.length == 0) {
        errores.push("El nombre ingresado no puede estar vacio.");
    }

    if (paciente.peso.length == 0) {
        errores.push("El peso ingresado no puede estar vacio.");
    }

    if (paciente.altura.length == 0) {
        errores.push("La altura ingresada no puede estar vacia.");
    }

    if (paciente.gordura.length == 0) {
        errores.push("El %gordura ingresado no puede estar vacio.");
    }

    if (!validarPeso(paciente.peso)) {
        errores.push("El peso ingresado es incorrecto.");
    }

    if (!validarAltura(paciente.altura)) {
        errores.push("La altura ingresada es incorrecta.");
    }

    return errores;
};

function exhibirMensajesErrores(errores) {
    var ul = document.querySelector("#mensajes-errores");
    ul.innerHTML = ""; // CON ".innerHTML" LO QUE HACEMOS ES RECETEAR LA LITA DE ERRORES, PERO VAN A SEGUIR APARECIENDO, LO QUE HARA ES CAMBIAR UN ERROR POR OTRO, CUANDO EL QUE ESTE SE HAYA CORREGIDO.

    errores.forEach(function(error) { // PARA CADA ERROR EN ERRORES, USAMOS UNA FUNCION ANONIMA, QUE LO QUE HACE ES ITERAR CADA ERROR, CREANDO UN "li" Y A ESE LE ASIGNA EL ERROR EN EL QUE ESTA ACTUALMENTE Y TAL "li" SERA ASIGNADO AL PADRE "ul". USAMOS UNA FUNCION ANONIMA PARA PASARLE AL "FOREACH" COMO PARAMETRO, Y COMO PARAMETRO DE LA FUNCION, LE PASAMOS LOS ITEMS DEL ARREGLO.
        
        var li = document.createElement("li");
        li.textContent = error;
        ul.appendChild(li);
    });
};