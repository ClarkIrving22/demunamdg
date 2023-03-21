var totalRowCount=0;
var totalSearchCount=0;

$(function(){    
    cargarPersonas();
    document.querySelector('.myTable').tsortable();
});

/*
function checkboxes(){
  $('#thead_checkbox').on('click',function(){
    if(this.checked){
        $('.tbody_checkbox').each(function(){
            this.checked = true;
        });
    }else{
        $('.tbody_checkbox').each(function(){
            this.checked = false;
        });
    }
  });

  $('.tbody_checkbox').on('click',function(){
      if($('.tbody_checkbox:checked').length == $('.tbody_checkbox').length){
          $('#thead_checkbox').prop('checked',true);
      }else{
          $('#thead_checkbox').prop('checked',false);
      }
  });
}
*/

function obtenerTotalFilas(){
    totalRowCount = $("#myTable tbody tr").length;
    totalSearchCount = totalRowCount;
    document.getElementById("numero_filas").innerHTML = "Mostrando "+totalSearchCount+" de "+totalRowCount+" elementos.";
}

function busqueda() {
    totalSearchCount = 0;
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
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
                          '<td>'+persona.apellidopaterno+' '+persona.apellidomaterno+' '+persona.nombres+'</td>'+
                          '<td>'+persona.dni+'</td>'+                          
                          '<td>'+fechanacTexto+'</td>'+
                          '<td>'+telefonoTexto+'</td>'+
                          '<td>'+persona.direccion+'</td>'+
                          '<td>'+
                            '<a class="edit" title="Editar" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>'+
                            '<a class="delete" title="Eliminar" data-toggle="tooltip"><i class="material-icons">&#xE872;</i></a>'+
                          '</td>'+
                        '</tr>';
      listadoHTML += personaHTML;
    }
    document.querySelector('#myTable tbody').outerHTML = listadoHTML;
    obtenerTotalFilas();
}