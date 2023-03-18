var totalRowCount=0;
var totalSearchCount=0;

$(function(){    
    cargarPersonas();
    document.querySelector('.myTable').tsortable();
});

function obtenerTotalFilas(){
    totalRowCount = $("#myTable tbody tr").length;
    totalSearchCount = totalRowCount;
    document.getElementById("numero_filas").innerHTML = "Mostrando "+totalSearchCount+" de "+totalRowCount+" elementos.";
}

function busqueda() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
          totalSearchCount++;
        }
        else {
          tr[i].style.display = "none";
        }
      }       
    }
    document.getElementById("numero_filas").innerHTML = "Mostrando "+totalSearchCount+" de "+totalRowCount+" elementos.";
    totalSearchCount = 0;
}

function getHeaders(){
    return{
      'Accept': "application/json",
      'Content-Type': "application/json"
      //'Authorization': localStorage.token
    };
}

async function cargarPersonas() {
    const request = await fetch('api/personas', {
        method: 'GET',
        headers: getHeaders()
    });
    const personas = await request.json();
    let listadoHTML = '';  
    for(let persona of personas){
      let fechanacTexto = persona.fechanac == null || persona.fechanac == ''? '----' : persona.fechanac;
      let telefonoTexto = persona.telefono == null || persona.telefono == ''? '----' : persona.telefono;      
      //let btn_eliminar = '<a href="#" onclick="eliminarUsuario('+persona.id+')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
      let personaHTML = '<tr onclick="">'+
                          '<td><input type="checkbox" class="tbody_checkbox"></td>'+
                          '<td>'+persona.dni+'</td>'+
                          '<td>'+persona.apellidopaterno+' '+persona.apellidomaterno+' '+persona.nombres+'</td>'+
                          '<td>'+fechanacTexto+'</td>'+
                          '<td>'+telefonoTexto+'</td>'+
                          '<td>'+persona.direccion+'</td>'+
                        '</tr>';
      listadoHTML += personaHTML;
    }
    document.querySelector('#myTable tbody').outerHTML = listadoHTML;
    obtenerTotalFilas();
}
