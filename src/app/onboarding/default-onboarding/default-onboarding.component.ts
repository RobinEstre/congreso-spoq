import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { EventsParams } from 'swiper/angular';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';

type Speaker = { name: string; spec: string; img: string };
type ProgramDayId = 'd17' | 'd18' | 'd19';
type ItemType = 'modulo' | 'live' | 'sponsor' | 'ceremony';
interface ProgramItem { text: string; type: ItemType; }
interface ProgramRoom { name: string; items: ProgramItem[]; }
interface ProgramDay { id: ProgramDayId; date: string; rooms: ProgramRoom[]; }

@Component({
  selector: 'app-default-onboarding',
  templateUrl: './default-onboarding.component.html',
  styleUrls: ['./default-onboarding.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DefaultOnboardingComponent implements OnInit {

  constructor(
    private router: Router, private fb: FormBuilder, private service: GeneralService,) {
  }

  formRegistro = this.fb.group({
    tipo_doc: ['', Validators.required],
    num_doc: ['', Validators.required],
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    telefono: ['', Validators.required],
    is_logia: [false, Validators.required],
    email: ['', [Validators.email, Validators.required]],
  });

  tipo_doc: any = [{ name: 'Peruano' }, { name: 'Extranjero' }]; spinner: boolean = false; year = new Date().getFullYear();
  priceUSD = 160; submitting = false; submitted = false;

  heroDesktop = 'https://images.alphacoders.com/131/thumb-1920-1311351.jpeg';
  heroMobile = 'https://images.alphacoders.com/131/thumb-1920-1311351.jpeg';

  // Menú
  topMenu = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Sobre', id: 'sobre' },
    { label: 'Plenaria', id: 'ejes' },
    // { label: 'Talleres', id: 'talleres' },
    // { label: 'Pósteres', id: 'posters' },
    { label: 'Ponentes', id: 'ponentes' },
    { label: 'Precio', id: 'precio' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Inscripción', id: 'contacto' },
  ];
  ejes = [
    'Conferencias magistrales (plenario)',
    'Cirugía de cabeza y cuello, abdomen, tórax y mamas',
    'Neurocirugía y uro-oncología',
    'Cirugía robótica y ginecología oncológica',
  ];
  talleres = [
    'Colocación de catéter port',
    'Intervencionismo mamario',
    'Avances en grapado y energía',
    'Curso intensivo para enfermería en oncología quirúrgica',
  ];
  speakers: Speaker[] = [
    { name: 'Alastair Thompson', spec: 'Mastología · Baylor St. Luke’s (EE. UU.)', img: 'https://www.spoq.pe/wp-content/uploads/2025/05/alastair-thompson.png' },
    { name: 'Rafael Arteta-Bulos', spec: 'Oncología urológica · Cleveland Clinic (EE. UU.)', img: 'https://www.spoq.pe/wp-content/uploads/2025/05/Rafael-Arteta-Bulos.png' },
    { name: 'Alberto Pieretti', spec: 'Urología oncológica · Cleveland Clinic (EE. UU.)', img: 'https://www.spoq.pe/wp-content/uploads/2025/05/Alberto-Pieretti.png' },
    { name: 'Horacio Asbun', spec: 'Cirugía de abdomen · Baptist Health (EE. UU.)', img: 'https://www.spoq.pe/wp-content/uploads/2025/05/Horacio-Asbun.png' },
    { name: 'Ana C. Botero', spec: 'Radiología oncológica · Baptist Health (EE. UU.)', img: 'https://www.spoq.pe/wp-content/uploads/2025/05/Ana-Cecilia-Botero.png' },
    { name: 'Heclí L. Vázquez', spec: 'Cirugía plástica · H.G. Dr. Rubén Leñero (México)', img: 'https://www.spoq.pe/wp-content/uploads/2025/05/Hecly-Lya-Vasquez.png' },
    { name: 'Óscar N. de Guzmán', spec: 'Mastología · I.O.N. (Bolivia)', img: 'https://www.spoq.pe/wp-content/uploads/2025/05/oscar-nino-de-guzman.png' },
    { name: 'Mariano Laporte', spec: 'Cirugía de abdomen · H. Alemán – S. Güemes (Argentina)', img: 'https://www.spoq.pe/wp-content/uploads/2025/05/Mariano-Laporte.png' },
    { name: 'Karen Casañas', spec: 'Dirección Médica · Bexa (Colombia)', img: 'https://www.spoq.pe/wp-content/uploads/2025/05/Karen-Casanas.png' },
    { name: 'Juan Pablo Dueñas', spec: 'Especialista en CLIO, ejerce en Clínica el Rosario, Colombia.', img: 'https://www.spoq.pe/wp-content/uploads/2025/05/Juan-Pablo-Duenas.png' },
    { name: 'Ariê Carneiro', spec: 'Uro-Oncología en el Hospital Israelita Albert Einstein, Brasil', img: 'https://www.spoq.pe/wp-content/uploads/2025/06/Arie-Carneiro.png' },
    { name: 'Emmanuel González', spec: 'Patólogo en la Clínica Bíblica', img: 'https://www.spoq.pe/wp-content/uploads/2025/06/Emmanuel-Gonzalez.png' },
    { name: 'Rafael Jaller', spec: 'Medicina Nuclear, Hospital de la Santa Creu, España', img: 'https://www.spoq.pe/wp-content/uploads/2025/06/Rafael-Jaller.png' },
  ];
  tiers = [
    {
      name: 'Estudiantes / Egresados',
      price: 20,
      badge: 'Virtual · LATAM',
      bullets: ['🎥 En vivo', '🌎 Acceso LATAM', '📜 Certificado digital'],
      desc: 'Ideal para estudiantes y egresados.',
      note: '* Cupos limitados.'
    },
    {
      name: 'Asistente virtual',
      price: 100,
      badge: 'Virtual · LATAM',
      bullets: ['🎥 Acceso completo en vivo', '🌎 Soporte antes y durante', '📜 Material digital'],
      desc: 'Plan completo y recomendado.',
      cta: 'Inscribirme ahora',
      note: '* Cupos limitados.',
      featured: true
    },
    {
      name: 'Residentes y Fellows',
      price: 50,
      badge: 'Virtual · LATAM',
      bullets: ['🎥 En vivo', '🌎 Acceso LATAM', '📜 Material digital'],
      desc: 'Tarifa preferente para residentes y fellows.',
      note: '* Cupos limitados.'
    }
  ];
  faqs = [
    { q: '¿Cómo me inscribo?', a: 'Completa el formulario de esta página y te enviaremos el link de pago y confirmación al correo registrado.' },
    { q: '¿Cuál es el costo?', a: 'Matrícula única de USD 160 para toda Latinoamérica. Incluye acceso en vivo, grabaciones por 30 días y certificado digital.' },
    { q: '¿Formas de pago?', a: 'Tarjeta de crédito/débito internacional. Si necesitas transferencia bancaria o pago corporativo, contáctanos.' },
    { q: '¿A qué hora se realiza?', a: 'La agenda se publica en hora oficial de Perú (GMT-5). Recibirás la programación y recordatorios por correo.' },
    { q: '¿Requisitos técnicos?', a: 'Conexión estable (recomendado ≥10 Mbps), navegador actualizado y dispositivo con audio. Para mejor experiencia, usa audífonos.' },
    { q: '¿Incluye certificado?', a: 'Sí. Certificado digital nominal enviado al correo registrado tras el evento.' },
    { q: '¿A quiénes está dirigido?', a: 'Médicos especialistas, médicos generales, residentes e internos interesados en actualización clínica.' },
    { q: '¿Idioma?', a: 'Español con soporte de traducción inglés–español.' },
    { q: '¿Acceso desde otro país?', a: 'Sí. Es 100% virtual para toda LATAM. El sistema ajusta automáticamente la zona horaria en los recordatorios.' },
    { q: '¿Soporte y ayuda rápida?', a: 'Soporte por correo y WhatsApp antes y durante el evento. Te asistimos con acceso, agenda y comprobantes.' }
  ];

  countries = ['Perú', 'México', 'Colombia', 'Chile', 'Argentina', 'Uruguay', 'Paraguay', 'Bolivia', 'Ecuador', 'Brasil', 'Venezuela', 'Costa Rica', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'Panamá', 'R. Dominicana', 'Puerto Rico'];

  flagPaused = false;

  latamCountries = [
    { flag: '🇵🇪', name: 'Perú' },
    { flag: '🇲🇽', name: 'México' },
    { flag: '🇨🇴', name: 'Colombia' },
    { flag: '🇨🇱', name: 'Chile' },
    { flag: '🇦🇷', name: 'Argentina' },
    { flag: '🇺🇾', name: 'Uruguay' },
    { flag: '🇵🇾', name: 'Paraguay' },
    { flag: '🇧🇴', name: 'Bolivia' },
    { flag: '🇪🇨', name: 'Ecuador' },
    { flag: '🇧🇷', name: 'Brasil' },
    { flag: '🇻🇪', name: 'Venezuela' },
    { flag: '🇨🇷', name: 'Costa Rica' },
    { flag: '🇬🇹', name: 'Guatemala' },
    { flag: '🇭🇳', name: 'Honduras' },
    { flag: '🇸🇻', name: 'El Salvador' },
    { flag: '🇳🇮', name: 'Nicaragua' },
    { flag: '🇵🇦', name: 'Panamá' },
    { flag: '🇩🇴', name: 'R. Dominicana' },
    { flag: '🇵🇷', name: 'Puerto Rico' }
  ];

  priceMap: Record<string, number> = { estudiante: 20, residente: 50, asistente: 100 };
  studentFileName: string | null = null;
  contactForm = this.fb.group({
    plan: ['asistente', Validators.required],
    first_name: ['', [Validators.required, Validators.minLength(2)]],
    last_name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    celular: ['', [Validators.required, Validators.minLength(8)]],
    country: ['Perú', Validators.required],
    specialty: ['', Validators.required],
    doc_number: ['', [Validators.required, Validators.minLength(6)]],
    cmp: [''],
    rne: [''],
    student_proof: [null as File | null]
  });

  sponsors = {
    platinum: [
      'https://all-files-cepefodes.s3.us-east-1.amazonaws.com/SPOQ/medtronic.png'
    ],
    diamond: [
      'https://all-files-cepefodes.s3.us-east-1.amazonaws.com/SPOQ/jhonson.png',
    ],
    gold: [
      'https://all-files-cepefodes.s3.us-east-1.amazonaws.com/SPOQ/cardiomed.png',
    ],
    partners: [
      'https://all-files-cepefodes.s3.us-east-1.amazonaws.com/SPOQ/genecod.png',
      'https://all-files-cepefodes.s3.us-east-1.amazonaws.com/SPOQ/idisac.png',
      'https://all-files-cepefodes.s3.us-east-1.amazonaws.com/SPOQ/premium-medical.png',
      'https://all-files-cepefodes.s3.us-east-1.amazonaws.com/SPOQ/resomasa.png',
      'https://all-files-cepefodes.s3.us-east-1.amazonaws.com/SPOQ/abott.png',
      'https://all-files-cepefodes.s3.us-east-1.amazonaws.com/SPOQ/fresenius.png',
      'https://all-files-cepefodes.s3.us-east-1.amazonaws.com/SPOQ/detecta-clinica.png',
      'https://all-files-cepefodes.s3.us-east-1.amazonaws.com/SPOQ/sunpharma.png',
      'https://all-files-cepefodes.s3.us-east-1.amazonaws.com/SPOQ/detecta-imagenes.png',
      'https://all-files-cepefodes.s3.us-east-1.amazonaws.com/SPOQ/alem.png',
      'https://all-files-cepefodes.s3.us-east-1.amazonaws.com/SPOQ/roca.png',
      'https://all-files-cepefodes.s3.us-east-1.amazonaws.com/SPOQ/fresenius-kabi.png',
      'https://all-files-cepefodes.s3.us-east-1.amazonaws.com/SPOQ/cayetano-heredia.png',
    ]
  };
  scrolled = true;

  programDays: ProgramDay[] = [
    {
      id: 'd17',
      date: '17 de septiembre',
      rooms: [
        {
          name: 'OLLANTAYTAMBO',
          items: [
            { text: 'Módulo: Cirugía plástica y reconstructiva', type: 'modulo' },
            { text: 'Simposios patrocinados por la industria', type: 'sponsor' },
            { text: 'Módulo: Cirugía de mamas', type: 'modulo' },
            { text: 'Transmisión en vivo: Cirugía de mama', type: 'live' }
          ]
        },
        {
          name: 'PISAC',
          items: [
            { text: 'Módulo: Cirugía de tórax', type: 'modulo' },
            { text: 'Módulo: Cirugía de abdomen', type: 'modulo' }
          ]
        }
      ]
    },
    {
      id: 'd18',
      date: '18 de septiembre',
      rooms: [
        {
          name: 'OLLANTAYTAMBO',
          items: [
            { text: 'Módulo: Neurocirugía', type: 'modulo' },
            { text: 'Módulo: Cirugía robótica', type: 'modulo' },
            { text: 'Módulo: Urología oncológica', type: 'modulo' }
          ]
        },
        {
          name: 'PISAC',
          items: [
            { text: 'Módulo: Cirugía de cabeza y cuello', type: 'modulo' },
            { text: 'Módulo: Innovaciones regionales en tratamiento oncológico', type: 'modulo' },
            { text: 'Módulo: Ginecología oncológica', type: 'modulo' }
          ]
        }
      ]
    },
    {
      id: 'd19',
      date: '19 de septiembre',
      rooms: [
        {
          name: 'OLLANTAYTAMBO',
          items: [
            { text: 'Módulo: Mesa Redonda – Redes de esperanza', type: 'modulo' },
            { text: 'Módulo: Conferencias magistrales', type: 'modulo' },
            { text: 'Ceremonia de clausura, premios y homenajes', type: 'ceremony' }
          ]
        },
        {
          name: 'PISAC',
          items: [
            { text: 'Módulo: Trabajos originales', type: 'modulo' },
            { text: 'Módulo: Reporte de casos', type: 'modulo' },
            { text: 'Módulo: Concurso de videos', type: 'modulo' }
          ]
        }
      ]
    }
  ];
  private dayById: Record<ProgramDayId, ProgramDay> = {} as any;

  selectedDay: ProgramDayId = 'd17';
  currentDay!: ProgramDay;

  ngOnInit(): void {
    this.onPlanChange();
    if (window.innerWidth < 992) {
      document.body.classList.add('has-mobile-cta');
    }
    this.programDays.forEach(d => this.dayById[d.id] = d);
    this.currentDay = this.dayById[this.selectedDay];
  }

  ngAfterViewInit(): void {
    // Reveal on scroll
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) (e.target as HTMLElement).classList.add('in');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // Speakers autoplay
    const track = document.querySelector('.track') as HTMLElement | null;
    if (track) {
      setInterval(() => {
        track.scrollBy({ left: 320, behavior: 'smooth' });
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 2) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }, 4000);
    }
  }

  ngOnDestroy() {
    document.body.classList.remove('has-mobile-cta');
  }

  setDay(id: ProgramDayId) {
    if (this.selectedDay !== id) {
      this.selectedDay = id;
      this.currentDay = this.dayById[id];
    }
  }

  planLabel(plan: 'estudiante' | 'residente' | 'asistente' | null | any): string {
    const p = plan ?? 'asistente';
    return p === 'estudiante' ? 'Estudiantes/Egresados'
      : p === 'residente' ? 'Residentes/Fellows'
        : 'Asistente virtual';
  }

  planPrice(plan: 'estudiante' | 'residente' | 'asistente' | null | any): number {
    const p = plan ?? 'asistente';
    return p === 'estudiante' ? 20 : p === 'residente' ? 50 : 100;
  }

  onStudentProof(evt: Event) {
    const input = evt.target as HTMLInputElement;
    const file = input?.files?.[0] ?? null;
    this.contactForm.patchValue({ student_proof: file });
  }

  onPlanChange() {
    const proof = this.contactForm.get('student_proof');
    if (!proof) return;
    if (this.contactForm.value.plan === 'estudiante') {
      proof.setValidators([Validators.required]);
    } else {
      proof.clearValidators();
      proof.setValue(null);
      this.studentFileName = null;
    }
    proof.updateValueAndValidity();
  }

  onFile(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (file) {
      this.contactForm.patchValue({ student_proof: file });
      this.studentFileName = file.name;
    }
  }

  invalid(ctrl: string) {
    const c = this.contactForm.get(ctrl);
    return c?.invalid && (c?.touched || this.submitted);
  }

  onSubmit() {
    this.submitting = true;
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.submitting = false;
      return;
    }

    // Construye payload limpio (incluye plan y precio)
    const val = this.contactForm.value;
    const payload = {
      plan: val.plan,
      price_usd: this.planPrice(val.plan as any),
      first_name: val.first_name,
      last_name: val.last_name,
      email: val.email,
      celular: val.celular,
      country: val.country,
      specialty: val.specialty,
      doc_number: val.doc_number,
      cmp: val.cmp || null,
      rne: val.rne || null
    };

    // Si necesitas multipart (por el archivo):
    const formData = new FormData();
    Object.entries(payload).forEach(([k, v]) => formData.append(k, String(v ?? '')));
    if (val.plan === 'estudiante' && val.student_proof) {
      formData.append('student_proof', val.student_proof);
    }

    // TODO: enviar formData a tu backend
    // this.service.postRegistro(formData).subscribe(...)

    setTimeout(() => {
      this.submitting = false;
      this.submitted = true;
      this.contactForm.reset({ plan: 'asistente', country: 'Perú' });
      this.studentFileName = null;
    }, 700);
  }

  altFromUrl(u: string): string {
    try {
      const n = u.split('/').pop() || 'patrocinador';
      return 'Logo ' + n.replace(/\.(png|jpe?g|svg|webp)$/i, '').replace(/[-_]/g, ' ');
    } catch { return 'Logo de patrocinador'; }
  }

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 200;
    const nav = document.querySelector('.navbar-bottom');
    if (!nav) return;
    if (window.scrollY > 60) nav.classList.add('nav-scrolled');
    else nav.classList.remove('nav-scrolled');
  }

  selectTipo(event: any) {
    this.contactForm.controls.doc_number.setValue('');
    this.contactForm.controls.first_name.setValue('');
    this.contactForm.controls.last_name.setValue('');
    this.contactForm.controls.doc_number.enable();
    this.contactForm.controls.first_name.enable();
    this.contactForm.controls.last_name.enable();
  }

  getInfoByDni(event: any) {
    let dni_consulta = {
      "tipo": "dni",
      "documento": event.target.value
    };
    this.contactForm.controls.first_name.setValue('');
    this.contactForm.controls.last_name.setValue('');
    if (event.target.value.length === 8 && this.contactForm.controls.country.value == 'Perú') {
      this.spinner = true
      this.contactForm.controls.doc_number.disable();
      this.service.getInfoDNI(dni_consulta.tipo, dni_consulta.documento).subscribe(dni_val => {
        this.spinner = false;
        this.contactForm.controls.doc_number.enable();
        if (dni_val.data.estado === false) {
          this.contactForm.controls.doc_number.setValue('');
          Swal.fire({
            position: "center",
            icon: "warning",
            title: "¡DNI no válido!",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          let dni = {
            "nombres": dni_val.data.resultado['nombres'],
            "apellidoPaterno": dni_val.data.resultado['apellido_paterno'],
            "apellidoMaterno": dni_val.data.resultado['apellido_materno'],
          }
          this.contactForm.controls.first_name.setValue(dni['nombres']);
          this.contactForm.controls.last_name.setValue(dni['apellidoPaterno'] + ' ' + dni['apellidoMaterno']);
          this.contactForm.controls.first_name.disable();
          this.contactForm.controls.last_name.disable();
        }
      }, error => {
        this.contactForm.controls.doc_number.setValue('');
        this.contactForm.controls.doc_number.enable();
        this.spinner = false;
        Swal.fire({
          position: "center",
          icon: "error",
          title: "¡Inténtelo en un momento!",
          showConfirmButton: false,
          timer: 1500
        });
      });
    }
    else {
      this.contactForm.controls.doc_number.enable();
      this.contactForm.controls.first_name.enable();
      this.contactForm.controls.last_name.enable();
    }
  }

  sendData() {
    if (this.formRegistro.invalid) {
      Swal.fire('Completa todos los campos correctamente', '', 'warning');
      return;
    }
    this.spinner = true;
    // Asegúrate de habilitar los campos antes de enviar
    Object.keys(this.formRegistro.controls).forEach(c => this.formRegistro.get(c)?.enable());
    const payload = this.formRegistro.value;

    this.service.postRegistro(payload).subscribe({
      next: (resp: any) => {
        this.spinner = false;
        let data = resp;
        let link_zoom = 'https://us02web.zoom.us/j/83639666299';
        if (typeof resp === 'string') {
          data = JSON.parse(resp); // Por si viene como string
        }
        if (data && data.certificado) {
          Swal.fire({
            title: '¡Registrado con éxito!',
            text: 'Entra al zoom para recibir tu certificado',
            showCancelButton: false,
            confirmButtonColor: '#dc3446',
            html: `<a href="${link_zoom}" target="_blank" class="btn btn-primary"><i class="bi bi-camera-video-fill"></i> Ingresar a la reunión</a>`,
            icon: 'success',
            confirmButtonText: 'Cerrar'
          });
          this.formRegistro.reset();
          this.formRegistro.controls.num_doc.disable();
          this.formRegistro.controls.tipo_doc.setValue('');
        } else {
          Swal.fire('Error en el registro', '', 'error');
        }
      },
      error: err => {
        this.spinner = false;
        Swal.fire('Hubo un error, intenta nuevamente', '', 'error');
      }
    });
  }

  // trackBy para evitar re-render innecesario
  trackRoom = (_: number, r: ProgramRoom) => r.name;
  trackItem = (_: number, i: ProgramItem) => i.text;
}
