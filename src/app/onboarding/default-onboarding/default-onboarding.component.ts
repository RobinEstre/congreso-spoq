import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { EventsParams } from 'swiper/angular';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';

type Speaker = { name: string; spec: string; img: string };

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

  tipo_doc: any = [{ name: 'Peruano' }, { name: 'Extranjero' }]; spinner: boolean = false
  year = new Date().getFullYear();
  priceUSD = 160;
  submitting = false;
  submitted = false;

  // Hero images
  heroDesktop = 'https://images.alphacoders.com/131/thumb-1920-1311351.jpeg';
  heroMobile = 'https://images.alphacoders.com/131/thumb-1920-1311351.jpeg'; // coloca aquí tu versión vertical

  // Menú
  topMenu = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Sobre', id: 'sobre' },
    { label: 'Ejes', id: 'ejes' },
    { label: 'Talleres', id: 'talleres' },
    { label: 'Pósteres', id: 'posters' },
    { label: 'Ponentes', id: 'ponentes' },
    { label: 'Precio', id: 'precio' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Inscripción', id: 'contacto' },
  ];

  // Contenido (tomado y adaptado a versión virtual LATAM)
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

  faqs = [
    { q: '¿A quiénes está dirigido?', a: 'Médicos especialistas, médicos generales, residentes e internos interesados en actualización clínica.' },
    { q: '¿Idioma?', a: 'Español (con soporte de traducción inglés–español cuando aplique).' },
    { q: '¿Incluye certificado?', a: 'Sí. Certificado digital incluido (USD 160), enviado al correo registrado.' },
    { q: '¿Acceso desde otro país?', a: 'Recibirás un enlace seguro (Zoom/streaming) y soporte previo al inicio.' },
  ];

  countries = ['Perú', 'México', 'Colombia', 'Chile', 'Argentina', 'Uruguay', 'Paraguay', 'Bolivia', 'Ecuador', 'Brasil', 'Venezuela', 'Costa Rica', 'Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'Panamá', 'R. Dominicana', 'Puerto Rico'];

  contactForm = this.fb.group({
    full_name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    country: ['Perú', Validators.required],
    specialty: ['', Validators.required],
    whatsapp: ['', [Validators.required, Validators.minLength(8)]],
    message: ['Quiero inscribirme al cupo virtual.'],
  });

  // En tu DefaultOnboardingComponent
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

  altFromUrl(u: string): string {
    try {
      const n = u.split('/').pop() || 'patrocinador';
      return 'Logo ' + n.replace(/\.(png|jpe?g|svg|webp)$/i, '').replace(/[-_]/g, ' ');
    } catch { return 'Logo de patrocinador'; }
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

  scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  @HostListener('window:scroll')
  onScroll() {
    const nav = document.querySelector('.navbar-bottom');
    if (!nav) return;
    if (window.scrollY > 60) nav.classList.add('nav-scrolled');
    else nav.classList.remove('nav-scrolled');
  }

  onSubmit() {
    this.submitting = true;
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.submitting = false;
      return;
    }
    // TODO: integra tu backend Django / WhatsApp
    setTimeout(() => {
      this.submitting = false;
      this.submitted = true;
    }, 700);
  }

  ngOnInit(): void {
    // this.spinner=true
    this.formRegistro.controls.num_doc.disable();
  }

  selectTipoDoc(event: any) {
    this.formRegistro.controls.num_doc.enable();
    this.formRegistro.controls.num_doc.setValue('');
    this.formRegistro.controls.nombres.setValue('');
    this.formRegistro.controls.apellidos.setValue('');
  }

  getInfoByDni(event: any) {
    let dni_consulta = {
      "tipo": "dni",
      "documento": event.target.value
    };
    this.formRegistro.controls.nombres.setValue('');
    this.formRegistro.controls.apellidos.setValue('');
    if (event.target.value.length === 8 && this.formRegistro.controls.tipo_doc.value == 'Peruano') {
      this.spinner = true
      this.formRegistro.controls.num_doc.disable();
      this.service.getInfoDNI(dni_consulta.tipo, dni_consulta.documento).subscribe(dni_val => {
        this.spinner = false;
        this.formRegistro.controls.num_doc.enable();
        if (dni_val.data.estado === false) {
          this.formRegistro.controls.num_doc.setValue('');
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
          Swal.fire({
            position: "center",
            icon: "success",
            title: "¡Consulta exitosa!",
            showConfirmButton: false,
            timer: 1000
          });
          this.formRegistro.controls.nombres.setValue(dni['nombres']);
          this.formRegistro.controls.apellidos.setValue(dni['apellidoPaterno'] + ' ' + dni['apellidoMaterno']);
          this.formRegistro.controls.nombres.disable();
          this.formRegistro.controls.apellidos.disable();
          this.formRegistro.controls['telefono'].enable();
          this.formRegistro.controls['email'].enable();
          this.formRegistro.controls['telefono'].setValue('');
          this.formRegistro.controls['email'].setValue('');
        }
      }, error => {
        this.formRegistro.controls.num_doc.setValue('');
        this.formRegistro.controls.num_doc.enable();
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
      this.formRegistro.controls.num_doc.enable();
      this.formRegistro.controls.nombres.enable();
      this.formRegistro.controls.apellidos.enable();
      this.formRegistro.controls['telefono'].enable();
      this.formRegistro.controls['email'].enable();
      this.formRegistro.controls['email'].setValue('');
      this.formRegistro.controls['telefono'].setValue('');
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
}
