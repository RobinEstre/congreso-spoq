import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-policies-refunds',
  templateUrl: './policies-refunds.component.html',
  styleUrls: ['./policies-refunds.component.scss'],
  encapsulation: ViewEncapsulation.Emulated // aislado del global
})
export class PoliciesRefundsComponent implements AfterViewInit {
  year = new Date().getFullYear();
  lastUpdated = '2025-06-01'; // <-- cámbialo cuando actualices la política

  toc = [
    { id: 'alcance', label: '1) Alcance' },
    { id: 'definiciones', label: '2) Definiciones' },
    { id: 'cambios', label: '3) Cambios' },
    { id: 'devoluciones', label: '4) Devoluciones' },
    { id: 'procedimiento', label: '5) Procedimiento' },
    { id: 'certificados', label: '6) Certificados' },
    { id: 'descuentos', label: '7) Descuentos' },
    { id: 'cancelacion', label: '8) Cancelación / Reprogramación' },
    { id: 'operaciones', label: '9) Operaciones y comprobantes' },
    { id: 'viaje', label: '10) Gastos de viaje' },
    { id: 'libro', label: '11) Libro de Reclamaciones' },
    { id: 'actualizaciones', label: '12) Actualizaciones' },
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
