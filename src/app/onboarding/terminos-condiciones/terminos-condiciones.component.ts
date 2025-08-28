import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-terminos-condiciones',
  templateUrl: './terminos-condiciones.component.html',
  styleUrls: ['./terminos-condiciones.component.scss'],
    encapsulation: ViewEncapsulation.Emulated // estilos solo aquí
})
export class TerminosCondicionesComponent implements OnInit {
  company = 'SOCIEDAD PERUANA DE ONCOLOGIA QUIRURGICA';
  ruc = '20511894345';
  lastUpdated = '2025-06-01';

  toc = [
    { id: 's1', label: '1) Aceptación de los Términos' },
    { id: 's2', label: '2) Descargo médico' },
    { id: 's3', label: '3) Definiciones' },
    { id: 's4', label: '4) Elegibilidad y uso' },
    { id: 's5', label: '5) Registro y seguridad' },
    { id: 's6', label: '6) Inscripciones y pagos' },
    { id: 's7', label: '7) Modificaciones y cancelaciones' },
    { id: 's8', label: '8) Certificaciones y constancias' },
    { id: 's9', label: '9) Conducta del usuario' },
    { id: 's10', label: '10) Propiedad intelectual' },
    { id: 's11', label: '11) Enlaces externos' },
    { id: 's12', label: '12) Datos personales y privacidad' },
    { id: 's13', label: '13) Comunicaciones y consentimientos' },
    { id: 's14', label: '14) Cookies' },
    { id: 's15', label: '15) Responsabilidad y garantías' },
    { id: 's16', label: '16) Fuerza mayor' },
    { id: 's17', label: '17) Libro de Reclamaciones' },
    { id: 's18', label: '18) Denuncias de infracción' },
    { id: 's19', label: '19) Cambios en los Términos' },
    { id: 's20', label: '20) Ley aplicable y jurisdicción' },
    { id: 's21', label: '21) Integración contractual' }
  ];

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngAfterViewInit(): void {
    // Animación reveal suave
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) (e.target as HTMLElement).classList.add('in'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.pol .reveal').forEach(el => io.observe(el));

    // Marca ítems activos del TOC al hacer scroll
    const headers = this.toc.map(t => document.getElementById(t.id)).filter(Boolean) as HTMLElement[];
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        const link = document.querySelector(`.toc a[href="#${en.target.id}"]`);
        if (!link) return;
        if (en.isIntersecting) link.classList.add('active');
        else link.classList.remove('active');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    headers.forEach(h => spy.observe(h));
  }

  ngOnInit(): void { }
}
