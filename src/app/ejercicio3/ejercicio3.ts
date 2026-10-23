import {Component, OnDestroy, OnInit} from '@angular/core';

interface EstadoColor {
  ejercicio3: boolean;
  color: string;
  indice: number;
}


@Component({
  imports: [],
  standalone: true,
  selector: 'app-ejercicio3',
  styleUrl: './ejercicio3.css',
  templateUrl: './ejercicio3.html',
})



export class Ejercicio3 implements OnInit, OnDestroy{
  colores = [
    {nombre: 'Verde', valor: '#28c112'},
    {nombre: 'Azul', valor: '#2196f3'},
    {nombre: 'Rojo', valor: '#e53935'},
    {nombre: 'Morado', valor: '#9c27b0'},
    {nombre: 'Naranja', valor: '#ff9800'},
    {nombre: 'Negro', valor: '#222222'}
  ];

  colorActual = '#28c112';
  historialColores: string[] = [];
  cambiosAtras = 1;
  mensaje = '';

  ngOnInit() {
    const guardado= localStorage.getItem('historialColoresEj3');
    const indiceGuardado= localStorage.getItem('indiceColorEj3');

    if (guardado) {
      this.historialColores = JSON.parse(guardado);
    }

    const estado = history.state as EstadoColor;

    if (estado?.ejercicio3 && this.historialColores.length > 0) {
      this.colorActual = estado.color;
    } else {
      this.colorActual = localStorage.getItem('colorActualEj3') || '#28c112';

      if (this.historialColores.length === 0) {
        this.historialColores = [this.colorActual];
      }

      const indice = indiceGuardado !== null ? Number(indiceGuardado): this.historialColores.length - 1;

      history.replaceState(
        {
          ejercicio3: true,
          color: this.colorActual,
          indice: indice

        } satisfies EstadoColor,
        ''
      );
    }


    this.guardarDatos();

    window.addEventListener('popstate', this.alCambiarHistorial);

  }

  ngOnDestroy() {
    window.removeEventListener('popstate', this.alCambiarHistorial);
  }

  cambiarColor(evento: Event): void  {
    const select = evento.target as HTMLSelectElement;
    const nuevoColor = select.value;

    if (nuevoColor === this.colorActual) {
      return;
    }

    const estadoActual = history.state as EstadoColor;
    const indiceActual = estadoActual?.ejercicio3 ? estadoActual.indice: this.historialColores.length - 1;


    this.historialColores = this.historialColores.slice(0, indiceActual + 1);
    this.historialColores.push(nuevoColor);

    this.colorActual = nuevoColor;

    const nuevoIndice = this.historialColores.length - 1;

    history.pushState(
      {
        ejercicio3: true,
        color: nuevoColor,
        indice: nuevoIndice,
      } satisfies EstadoColor,
      ''
    );

    this.mensaje = '';
    this.guardarDatos();
  }

  alCambiarHistorial = (evento: PopStateEvent): void => {
    const estado = evento.state as EstadoColor | null;

    if (estado?.ejercicio3) {
      this.colorActual = estado.color;
      this.mensaje = '';
      this.guardarDatos();
    }
  };

  atras() {
    history.back();
  }

  adelante() {
    history.forward();
  }

  retrocederCambios(): void {
    const estado = history.state as EstadoColor;
    const indiceActual = estado?.ejercicio3 ? estado.indice: this.historialColores.length - 1;

    if (
      !Number.isInteger(this.cambiosAtras) || this.cambiosAtras < 1 || this.cambiosAtras > indiceActual
    ) {
      this.mensaje = `No puedes retroceder ${this.cambiosAtras} cambio(s)`;
      return;
    }

    this.mensaje = '';
    history.go(-this.cambiosAtras);
  }

  actualizarCambios(evento: Event): void {
    this.cambiosAtras = Number((evento.target as HTMLInputElement).value);
  }

  get numeroCambios(): number {
    return this.historialColores.length;
  }

  get posicionActual(): number {
    const estado = history.state as EstadoColor;

    if (estado?.ejercicio3) {
      return estado.indice + 1;
    }

    return this.historialColores.length;
  }

  private guardarDatos(): void {
    localStorage.setItem('colorActualEj3', this.colorActual);
    localStorage.setItem(
      'historialColoresEj3',
      JSON.stringify(this.historialColores)
    );

    const estado= history.state as EstadoColor;

    if (estado?.ejercicio3) {
      localStorage.setItem('indiceColorEj3', String(estado.indice));
    }
  }

}
