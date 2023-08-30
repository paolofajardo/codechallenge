document.addEventListener("DOMContentLoaded", function() {
    let formulario = document.getElementById("formulario");
    let listaRegistrosDiv = document.getElementById("listaRegistros");
  
    formulario.addEventListener("submit", async function(event) {
      event.preventDefault();
  
      let nombre = document.getElementById("nombre").value;
      let apellido = document.getElementById("apellido").value;
      let grupo = document.getElementById("grupo").value;
      let sala = document.getElementById("sala").value;
  
      let data = {
        name: nombre,
        apellido: apellido,
        grupo: grupo,
        sala: sala
      };
  
      try {
        let response = await fetch("https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo265", {
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          method: "POST",
          body: JSON.stringify(data)
        });
  
        let responseData = await response.json();
        console.log("Respuesta del servidor:", responseData);
  
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    });
  
    async function mostrarListaRegistros() {
      try {
        let response = await fetch("https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo265");
        let registros = await response.json();
    
        let tbody = listaRegistrosDiv.querySelector("tbody");
        tbody.innerHTML = "";
    
        registros.forEach(registro => {
          let row = tbody.insertRow();
          
          let nombreCell = row.insertCell();
          nombreCell.textContent = registro.name;
    
          let apellidoCell = row.insertCell();
          apellidoCell.textContent = registro.apellido;
    
          let grupoCell = row.insertCell();
          grupoCell.textContent = registro.grupo;
    
          let salaCell = row.insertCell();
          salaCell.textContent = registro.sala;
    
          let accionesCell = row.insertCell();
          
          let eliminarBtn = document.createElement("img");
          eliminarBtn.src = "imagen.png";
          eliminarBtn.classList.add("eliminarBtn");
          eliminarBtn.addEventListener("click", async () => await eliminarRegistro(registro._id));
          
          accionesCell.appendChild(eliminarBtn);
        });
    
      } catch (error) {
        console.error("Error al obtener la lista de registros:", error);
      }
    }
  
    async function eliminarRegistro(registroId) {
      try {
        let response = await fetch(`https://crudcrud.com/api/adc54d7744e946cd8ffc1851accabb6d/grupo265/${registroId}`, {
          method: "DELETE"
        });
  
        if (response.ok) {
          console.log("Registro eliminado exitosamente.");
          mostrarListaRegistros(); // Actualiza la lista después de eliminar
        } else {
          console.error("Error al eliminar el registro.");
        }
  
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  
    mostrarListaRegistros();
    setInterval(mostrarListaRegistros, 1500); // Actualiza cada 1.5 segundos
  });
  