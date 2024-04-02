import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function requiredFileType(type: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value as File;
      if (!file) {
        // Si no hay archivo, no hay error
        return null;
      }
  
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (!ext || type.toLowerCase() !== ext) {
        // Si la extensión no coincide o no se puede determinar, devuelve el error
        return { requiredFileType: true };
      }
  
      // Si la extensión coincide, no hay error
      return null;
    };
  }