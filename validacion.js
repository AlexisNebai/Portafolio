const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones ={
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	nombre: false,
	correo: false
}

const validarFormulario = (e) => {
    switch(e.target.name){
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
            
        case "email":
            validarCampo(expresiones.correo, e.target, 'email');
        break;

        case "asunto":
            validarCampo(expresiones.nombre, e.target, 'asunto');
        break;
    }
}

const validarCampo = (expresion, input, campo) =>{
    if(expresion.test(input.value)){
        document.getElementById(`grupo_${campo}`).classList.remove('input-box-incorrecto');
        document.getElementById(`grupo_${campo}`).classList.add('input-box-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-circle-check');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-circle-xmark');
        campos[campo] = true;
    }else{
        document.getElementById(`grupo_${campo}`).classList.add('input-box-incorrecto'); 
        document.getElementById(`grupo_${campo}`).classList.remove('input-box-correcto');
        document.querySelector(`#grupo_${campo} i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo_${campo} i`).classList.remove('fa-circle-check');
        document.querySelector(`#grupo_${campo} .formulario_input-error`).classList.add('formulario_input-error-activo');
        document.querySelector(`#grupo_${campo} .formcontato__input`).classList.add('formcontato__input-margen');
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario); 
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if(campos.nombre && campos.email && campos.asunto){
        formulario.reset();

        document.getElementById('formulario_mensaje-exito').classList.add('formulario_mensaje-exito-activo');
        setTimeout(() => {
            document.getElementById('formulario_mensaje-exito').classList.remove('formulario_mensaje-exito-activo');
        },3000);

        document.querySelectorAll('.input-box-correcto').forEach ((icono) =>{
            icono.classList.remove('input-box-correcto');
        });
    } else {
        document.getElementById('formulario_aviso').classList.add('formulario_aviso-activo');
        setTimeout(() => {
            document.getElementById('formulario_aviso').classList.remove('formulario_aviso-activo');
        },3000);
    }

});