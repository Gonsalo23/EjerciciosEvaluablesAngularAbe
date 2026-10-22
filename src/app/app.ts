import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Ejercicio1} from './ejercicio1/ejercicio1';
import {Ejercicio2} from './ejercicio2/ejercicio2';
import {Ejercicio3} from './ejercicio3/ejercicio3';
import {Ejercicio4} from './ejercicio4/ejercicio4';
import {Ejercicio5Cookies} from './ejercicio5-cookies/ejercicio5-cookies';
import {Ejercicio5LocalStorage} from './ejercicio5-local-storage/ejercicio5-local-storage';


@Component({
  imports: [RouterOutlet, Ejercicio1, Ejercicio2, Ejercicio3, Ejercicio4, Ejercicio5Cookies, Ejercicio5LocalStorage],
  selector: 'app-root',
  standalone: true,
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('EjerciciosEvaluablesAngular');
}
