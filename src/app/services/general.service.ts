import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  
  private lambdaUrl = 'https://egncndnbll.execute-api.us-east-1.amazonaws.com/default/register-form'; // URL de la función Lambda

  constructor(private httpClient: HttpClient) { }

  // POST para el formulario de registro
  postRegistro(data: any): Observable<any> {
    return this.httpClient.post<any>(this.lambdaUrl, data);
  }

  getInfoDNI(tipo: any, doc: any) {
    return this.httpClient.get<any>('https://aula.altux.edu.pe/api/consultar-dni-ruc/?type=' + tipo + '&num_doc=' + doc);
  }
}
