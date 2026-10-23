import {Component, OnInit} from '@angular/core';

interface DatosUsuario {
  nombre: string;
  visitas: number;
  ultimaVisita: string;
  tema: string;
}

@Component({
  imports: [],
  standalone: true,
  selector: 'app-ejercicio5-cookies',
  styleUrl: './ejercicio5-cookies.css',
  templateUrl: './ejercicio5-cookies.html',
})
export class Ejercicio5Cookies implements OnInit{

  nombre = '';
  nombreGuardado = '';
  visitas = 0;
  ultimaVisita = '';
  tema= 'oscuro';
  visitaActual = new Date().toLocaleString('es-ES');

  ngOnInit() {
    const datos= this.leerCookie();

    if (datos) {
      this.nombreGuardado = datos.nombre;
      this.visitas = datos.visitas + 1;
      this.ultimaVisita = datos.ultimaVisita;
      this.tema = datos.tema || 'oscuro';
    } else {
      this.visitas = 1;
    }

    this.visitaActual = new Date().toLocaleString('es-ES');
    this.guardarCookie();
    this.aplicarTema();
  }

  guardarNombre(): void {
    this.nombreGuardado = this.nombre.trim();

    if(!this.nombreGuardado) {
      return;
    }

    this.guardarCookie();
  }

  cambiarTema(evento: Event): void {
    this.tema = (evento.target as HTMLSelectElement).value;
    this.guardarCookie();
    this.aplicarTema();
  }

  guardarCookie(): void {
    const datos: DatosUsuario = {
      nombre: this.nombreGuardado,
      visitas: this.visitas,
      ultimaVisita: this.visitaActual,
      tema: this.tema
    };

    const fechaCaducidad = new Date();
    fechaCaducidad.setTime(fechaCaducidad.getTime() + 24 * 60 * 60 * 1000);

    document.cookie =
      'datosUsuarioCookiesEj5=' +
      encodeURIComponent(JSON.stringify(datos)) +
      '; expires=' + fechaCaducidad.toUTCString() +
      '; path=/; SameSite=Lax';
  }

  leerCookie(): DatosUsuario | null {
    const cookies = document.cookie.split('; ');

    const cookie = cookies.find(elemento => elemento.startsWith('datosUsuarioCookiesEj5'));

    if (!cookie) {
      return null;
    }

    try {
      const valor = cookie.substring('datosUsuarioCookiesEj5='.length);
      return JSON.parse(decodeURIComponent(valor)) as DatosUsuario;
    } catch {
      return null;
    }
  }

  aplicarTema(): void {
    const temaLocalStorage = localStorage.getItem('temaLocalStorageEj5');

    const temaAplicado = temaLocalStorage || this.tema;

    document.body.style.backgroundColor =
      temaAplicado === 'claro' ? '#f5f5f5' : '#121212';

    document.body.style.color =
      temaAplicado === 'claro' ? '#121212' : '#ffffff';
  }

  borrarDatos(): void {
    document.cookie =
      'datosUsuarioCookiesEj5=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax';

    this.nombre = '';
    this.nombreGuardado = '';
    this.visitas = 0;
    this.ultimaVisita = '';
    this.tema = 'oscuro';

    this.aplicarTema();
  }


}
