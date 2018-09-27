/*
 * Phone number form control matcher.
 *
 * @author Michel Megens
 * @email  dev@bietje.net
 */

import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

export class PhonenumberMatcher implements ErrorStateMatcher {
  private isValidPhoneNumber(control : FormControl) : boolean {
    if(control.value.toString().length <= 0)
      return true;

    return control.value.toString().match(/[^0-9]+/) === null;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const submitted = form && form.submitted;

    if(!this.isValidPhoneNumber(control))
      return true;

    return control && control.invalid && (control.dirty || control.touched || submitted);
  }
}
