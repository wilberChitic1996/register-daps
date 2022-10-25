import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';


export const valorZeroValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const valor = control.value;
      //console.log('Valor obtenido en el validador: '+valor);
      if(valor===0){
        return {valorZero:{value: control.value}};
      }
    return null;
};


@Directive({
  selector: '[appZero]',
  providers: [{provide: NG_VALIDATORS, useExisting: ZeroValidatorDirective, multi: true}]
})
export class ZeroValidatorDirective implements Validator {
  //@Input('appForbiddenName') forbiddenName = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return valorZeroValidator(control);
  }
}


