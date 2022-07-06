import React from 'react'
import Swal from 'sweetalert2'


export const swal = () => {
  return (
    Swal.fire({
        title: "Credenciales inválidas",
        text: "Por favor ingroduzca credenciales válidas",
        confirmButtonText: "Aceptar",
        width: "400px",
        timer: 10000,
        timerProgressBar: true
      })
  )
}

