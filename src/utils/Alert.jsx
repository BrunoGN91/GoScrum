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

export const swalRegister = (value) => {
  return (
    Swal.fire({
        title: `Todo listo ${value}`,
        text: "Ya puedes continuar y empezar tu aventura Go Scrum",
        confirmButtonText: "Aceptar",
        width: "400px",
        timer: 10000,
        timerProgressBar: true
      })
  )
}


