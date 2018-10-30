import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AccountService} from '../../../services/account.service';
import {DOCUMENT} from '@angular/common';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login.service';
import {ErrorStateMatcher} from '@angular/material';

class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const submitted = form && form.submitted;

    return !!(control && control.invalid && (control.dirty || control.touched || submitted));
  }
}

@Component({
  selector: 'app-confirm-phone-number',
  templateUrl: './confirm-phone-number.component.html',
  styleUrls: ['./confirm-phone-number.component.css']
})

export class ConfirmPhoneNumberComponent implements OnInit {
  codeField : FormControl;
  codeForm : FormGroup;
  matcher : FormErrorStateMatcher;

  constructor(private accounts : AccountService,
              @Inject(DOCUMENT) private document : Window,
              private router : Router, private auth : LoginService) { }

  ngOnInit() {
    this.matcher = new FormErrorStateMatcher();

    this.codeField = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);

    this.codeForm = new FormGroup({
      codeField: this.codeField
    });

    console.log(encodeURI(this.document.location.origin + '/login'));
  }

  onConfirm() {
    this.accounts.confirmPhoneNumber(this.codeField.value).subscribe(res => {
      this.router.navigate(['/profile']);
    }, error => {
      this.codeField.setErrors({
        "invalid" : true
      });
    });
  }

  isValid() {
    return this.codeForm.valid;
  }

  onResize() {
  }
}
