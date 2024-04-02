import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from './contract';

@Injectable({
  providedIn: 'root'
})
export class ContractsService {

  private apiUrl = 'http://localhost:8080/contratos';

  constructor(private http: HttpClient) { }

  guardarContrato(contrato: Contract): Observable<any> {
    
    return this.http.post<any>(this.apiUrl, contrato);
  }
  obtenerContratos(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.apiUrl);
  }

}
