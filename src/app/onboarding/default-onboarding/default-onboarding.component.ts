import { Component, OnInit } from '@angular/core';
import { EventsParams } from 'swiper/angular';
import { Router } from '@angular/router';
import Swal from "sweetalert2";
import { FormBuilder, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';


@Component({
  selector: 'app-default-onboarding',
  templateUrl: './default-onboarding.component.html',
  styleUrls: ['./default-onboarding.component.scss']
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
        let link_zoom='https://us02web.zoom.us/j/83639666299';
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
