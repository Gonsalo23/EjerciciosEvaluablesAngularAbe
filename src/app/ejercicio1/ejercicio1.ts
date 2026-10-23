import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';


@Component({
  imports: [
    DatePipe
  ],
  selector: 'app-ejercicio1',
  styleUrl: './ejercicio1.css',
  templateUrl: './ejercicio1.html',
  standalone: true
})
export class Ejercicio1 implements OnInit, OnDestroy{

  fechaHora: Date = new Date();
  intervalo: any;

  formato24h: boolean = true

  zonaCiudad: string = 'Europe/London';
  nombreCiudad: string = '';
  horaCiudad: string = '';

  constructor(private detector: ChangeDetectorRef) {}

  ngOnInit() {
    this.actualizarHora();

    this.intervalo = setInterval(() => {
      this.fechaHora = new Date();

      this.actualizarHora();

      this.detector.detectChanges();
    }, 1000);
  }

  actualizarHora() {

    this.horaCiudad = new Intl.DateTimeFormat('es-Es', {
      timeZone: this.zonaCiudad,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: !this.formato24h
    }).format(this.fechaHora)

  }

  cambiarCiudad(evento: Event) {

    const seleccion = evento.target as HTMLSelectElement;
    this.zonaCiudad = seleccion.value;

    const ciudades: {[zona: string]: string} = {
      'Europe/London': 'Londres',
      'America/New_York': 'Nueva York',
      'Asia/Tokyo': 'Tokio',
      'Europe/Madrid': 'Madrid'
    }

    this.nombreCiudad = ciudades[this.zonaCiudad];

    this.actualizarHora();

  }

  ngOnDestroy() {
    clearInterval(this.intervalo)
  }


}
