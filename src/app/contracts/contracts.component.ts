import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { requiredFileType } from './ValidatorsFiles'
import { ContractsService } from './contracts.service';
import { Contract } from './contract';

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.css'
})
export class ContractsComponent {
  contractForm: FormGroup;
  contratos: Contract[] = [];
  lotes: Contract[][] = [];
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private formBuilder: FormBuilder, private contractsService: ContractsService) {
    this.contractForm = this.formBuilder.group({
      modalidad: ['', Validators.required],
      numeroContrato: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      regimen: ['', Validators.required],
      archivo: ['', [Validators.required]]//, requiredFileType('txt')]]
    });
  }

  get numeroContrato() { return this.contractForm.get('numeroContrato'); }

  onSubmit() {
    if (this.contractForm.valid) {
      const nuevoContrato = this.contractForm.value as Contract;

      this.contractsService.guardarContrato(nuevoContrato).subscribe(contrato => {
        this.contratos.push(contrato);
        this.actualizarLotes();
        console.log('Contrato guardado correctamente:', contrato);
        this.contractForm.reset();
      });
    } else {
      console.log('Formulario inválido, por favor completa los campos correctamente.');
    }
  }

  nextPage() {
    if ((this.currentPage * this.pageSize) < this.contratos.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  actualizarLotes() {
    this.lotes = [];
    for (let i = 0; i < this.contratos.length; i += 10) {
      this.lotes.push(this.contratos.slice(i, i + 10));
    }
  }

  get f(): any {
    return this.contractForm?.controls;
  }
}
