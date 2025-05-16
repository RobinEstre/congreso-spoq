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
    email: ['', [Validators.email, Validators.required]],
  });

  tipo_doc: any = [{ name: 'Peruano' }, { name: 'Extranjero' }]; spinner: boolean = false

  ngOnInit(): void {
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
        this.spinner=false;
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
        this.spinner=false;
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
}
