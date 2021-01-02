import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ConstantesService {


  public URL_BASE = "https://ayd1-back-main/";


  constructor() { }


  DesplegarMensajePermantendeExito = async (Titulo: string, Texto: string) => {//void
  Swal.fire({
    icon: 'success',
    title: Titulo,
    text: Texto
  });
  }


  DesplegarMensajePermantendeError = async (Titulo: string, Texto: string) => {//void
    Swal.fire({
      icon: 'error',
      title: Titulo,
      text: Texto
    });
  }  


  DesplegarMensajeTemporaldeExito = async (Titulo: string, TiempoenMiliSegundos: number) => {//void
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: TiempoenMiliSegundos,
        timerProgressBar: false,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: Titulo
      })
  }


  DesplegarMensajeTemporaldeError = async (Titulo: string, TiempoenMiliSegundos: number) => {//void
  const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: TiempoenMiliSegundos,
    timerProgressBar: false,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  Toast.fire({
    icon: 'error',
    title: Titulo
  })
  }


  sleep = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
