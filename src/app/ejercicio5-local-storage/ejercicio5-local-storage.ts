import {Component, OnInit} from '@angular/core';

interface DatosUsuarioLocal {
  nombre: string;
  visitas: number;
  ultimaVisita: string;
}

@Component({
  imports: [],
  selector: 'app-ejercicio5-local-storage',
  styleUrl: './ejercicio5-local-storage.css',
  templateUrl: './ejercicio5-local-storage.html',
})
export class Ejercicio5LocalStorage implements OnInit {
  nombre = '';
  nombreGuardado = '';
  visitas = 0;
  ultimaVisita = '';
  tema = 'oscuro';
  visitaActual = new Date().toLocaleString('es-ES');

  ngOnInit(): void {
    const datosGuardados = localStorage.getItem('datosUsuarioLocalEj5');
    const datos = datosGuardados
      ? JSON.parse(datosGuardados) as DatosUsuarioLocal
      : null;

    if (datos) {
      this.nombreGuardado = datos.nombre;
      this.visitas = datos.visitas + 1;
      this.ultimaVisita = datos.ultimaVisita;
    } else {
      this.visitas = 1;
    }

    this.tema = localStorage.getItem('temaLocalStorageEj5') || 'oscuro';

    this.visitaActual = new Date().toLocaleString('es-ES');

    this.guardarDatos();
    this.aplicarTema();
  }

  guardarNombre(): void {
    this.nombreGuardado = this.nombre.trim();

    if (!this.nombreGuardado) {
      return;
    }

    this.guardarDatos();
  }

  cambiarTema(evento: Event) {
    this.tema = (evento.target as HTMLSelectElement).value;

    localStorage.setItem('temaLocalStorageEj5', this.tema);

    this.guardarDatos();
    this.aplicarTema();
  }

  guardarDatos(): void {
    const datos: DatosUsuarioLocal= {
      nombre: this.nombreGuardado,
      visitas: this.visitas,
      ultimaVisita: this.visitaActual
    };

    localStorage.setItem(
      'datosUsuarioLocalEj5',
      JSON.stringify(datos)
    );
  }

  aplicarTema(): void {
    const temaLocalStorage = localStorage.getItem('temaLocalStorageEj5');

    if (temaLocalStorage) {
      this.tema = temaLocalStorage;
    } else {
      const cookie = document.cookie.split('; ').find(elemento => elemento.startsWith('datosUsuarioCookiesEj5'));

      if (cookie) {
        try {
          const valor = cookie.substring('datosUsuarioCookiesEj5='.length);

          const datos = JSON.parse(
            decodeURIComponent(valor)
          ) as { tema?: string };

          this.tema = datos.tema || 'oscuro';
        } catch {
          this.tema = 'oscuro;'
        }
      } else {
        this.tema = 'oscuro';
      }
    }

    document.body.style.backgroundColor =
      this.tema === 'claro' ? '#f5f5f5' : '#121212';

    document.body.style.color =
      this.tema === 'claro' ? '#121212' : '#ffffff';
  }

  borrarDatos(): void {
    localStorage.removeItem('datosUsuarioLocalEj5');
    localStorage.removeItem('temaLocalStorageEj5');

    this.nombre = '';
    this.nombreGuardado = '';
    this.visitas = 1;
    this.ultimaVisita = '';
    this.tema = 'oscuro';
    this.visitaActual = new Date().toLocaleString('es-ES');

    this.aplicarTema();
  }

}
