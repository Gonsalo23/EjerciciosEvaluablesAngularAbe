import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-ejercicio2',
  styleUrl: './ejercicio2.css',
  templateUrl: './ejercicio2.html',
})
export class Ejercicio2 {

  cantidad: number = 5;
  minimo: number = 1;
  maximo: number = 10;

  permitirRepetidos: boolean = true;

  numeros: number[] = []
  mensajeError: string = '';

  generarNumeros() {
    this.numeros = [];
    this.mensajeError = '';

    if (
      !Number.isInteger(this.cantidad) || !Number.isInteger(this.minimo) || !Number.isInteger(this.maximo) ||
      this.cantidad < 1 || this.minimo > this.maximo
    ) {

      this.mensajeError = 'Introduce una cantidad positiva y un intervalo válido de números enteros';
      return;
    }

    const posibles = this.maximo - this.minimo + 1;

    if (!this.permitirRepetidos && this.cantidad > posibles) {

      this.mensajeError = `No puedes generar ${this.cantidad} números sin repetir.` + `Solo hay ${posibles} números posibles en ese intervalo.`;

    return;

    }

    while (this.numeros.length < this.cantidad) {

      const numero = Math.floor(Math.random() * (this.maximo - this.minimo + 1))
      + this.minimo

      if (this.permitirRepetidos || !this.numeros.includes(numero)) {
        this.numeros.push(numero)
      }

    }

  }

}
