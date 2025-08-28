import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  encapsulation: ViewEncapsulation.Emulated // estilos solo aquí
})
export class PrivacyPolicyComponent {
  company = 'SOCIEDAD PERUANA DE ONCOLOGIA QUIRURGICA';
  ruc = '20511894345';
  lastUpdated = '2025-06-01';

  toc = [
    { id: 's1', label: '1) ¿Quién trata tus datos?' },
    { id: 's2', label: '2) ¿Qué datos recopilamos?' },
    { id: 's3', label: '3) ¿Para qué usamos tus datos?' },
    { id: 's4', label: '4) ¿Cuál es la base legal?' },
    { id: 's5', label: '5) ¿Con quién los compartimos?' },
    { id: 's6', label: '6) Transferencias internacionales' },
    { id: 's7', label: '7) Plazos de conservación' },
    { id: 's8', label: '8) Derechos ARCO y canales' },
    { id: 's9', label: '9) Seguridad de la información' },
    { id: 's10', label: '10) Menores de edad' },
    { id: 's11', label: '11) Cookies y tecnologías' },
    { id: 's12', label: '12) Libro de Reclamaciones' },
    { id: 's13', label: '13) Enlaces a terceros' },
    { id: 's14', label: '14) Cambios a esta política' }
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
}
