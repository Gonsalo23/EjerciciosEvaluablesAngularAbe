import {Component, OnDestroy} from '@angular/core';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-ejercicio4',
  styleUrl: './ejercicio4.css',
  templateUrl: './ejercicio4.html',
})
export class Ejercicio4 implements OnDestroy {

  ventana: Window | null = null;
  intervalo: ReturnType<typeof setInterval> | null = null;

  abrirVentana(): void {

    if (this.ventana && !this.ventana.closed) {
      return;
    }

    this.ventana = window.open(
      '',
      'ventanaHija',
      'width=400,height=400,resizable=yes'
    );

    if (!this.ventana) {
      alert('El navegador ha bloqueado la ventana emergente. Permite las ventanas emergentes para esta página');
      return;;
    }

    this.intervalo = setInterval(() => {
      if (this.ventana?.closed) {
        this.limpiarVentana();
      }
    }, 300);

    this.ventana.addEventListener('beforeunload', () => {
      this.limpiarVentana();
    });
  }

  moverVentana(direccion: string): void {
    if (!this.ventana || this.ventana.closed) {
      this.limpiarVentana();
      return;
    }

    let x = 0;
    let y = 0;

    switch (direccion) {
      case 'arriba':
        y = -100;
        break;
      case 'abajo':
        y = 100;
        break;
      case 'izquierda':
        x = -100;
        break;
      case 'derecha':
        x = 100;
        break;
    }

    this.ventana.moveBy(x,y);
    this.ventana.focus();
  }

  cerrarVentana(): void {
    if (this.ventana && !this.ventana.closed) {
      this.ventana.close();
    }

    this.limpiarVentana();
  }

  private limpiarVentana(): void {
    this.ventana = null;

    if (this.intervalo !== null) {
      clearInterval(this.intervalo);
      this.intervalo = null;
    }
  }

  ngOnDestroy() {
    this.cerrarVentana();
  }
}
