import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private httpClient: HttpClient) { }

  getInfoDNI(tipo: any, doc:any) {
    return this.httpClient.get<any>('https://aula.altux.edu.pe/api/consultar-dni-ruc/?type='+tipo+'&num_doc='+doc);
  }
}
