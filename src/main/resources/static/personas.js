
//$(document).ready(function() {
    //cargarPersonas();
//    $('#personas-tabla').DataTable();
//});
cargarPersonas()
async function cargarPersonas() {
    const request = await fetch('api/personas', {
        method: 'GET',
        headers: getHeaders()
    });
    const personas = await request.json();
    let listadoHTML = '';  
    for(let persona of personas){
      //let telefonoTexto = persona.telefono == null ? '---' : persona.telefono;
      //let btn_eliminar = '<a href="#" onclick="eliminarUsuario('+persona.id+')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
      let usuarioHTML = '<tr>'+
                          '<td>'+persona.id+'</td>'+
                          '<td>'+persona.dni+'</td>'+
                          '<td>'+persona.apellidopaterno+'</td>'+
                          '<td>'+persona.apellidomaterno+'</td>'+
                          '<td>'+persona.nombres+'</td>'+
                          '<td>'+persona.fechanac+'</td>'+
                          '<td>'+persona.telefono+'</td>'+
                          '<td>'+persona.direccion+'</td>'+
                        '</tr>';
      listadoHTML += usuarioHTML;
    }
    document.querySelector('#personas-tabla tbody').outerHTML = listadoHTML;
}
  
async function eliminarUsuario(id){
    if(confirm('Eliminar persona?')){
      const request = await fetch('api/personas/'+id, {
        method: 'DELETE',
        headers: getHeaders()
      });
      location.reload();
    }  
}
  
function getHeaders(){
    return{
      'Accept': "application/json",
      'Content-Type': "application/json"
      //'Authorization': localStorage.token
    };
}
