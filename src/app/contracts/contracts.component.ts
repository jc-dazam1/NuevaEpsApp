import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { requiredFileType } from './ValidatorsFiles'
@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contracts.component.html',
  styleUrl: './contracts.component.css'
})
export class ContractsComponent {
  contractForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
      console.log('Formulario válido, guardando archivo...');
    } else {
      console.log('Formulario inválido, por favor completa los campos correctamente.');
    }
  }

  get f(): any {
    return this.contractForm?.controls;
  }
}
