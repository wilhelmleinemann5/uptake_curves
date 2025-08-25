import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { McInputDate } from '@maersk-global/mds-components-core/mc-input-date';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
  host: { class: 'mds-page mds-container' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class ValidationComponent {
  validationForm: FormGroup;
  errormessage = '';

  constructor(private fb: FormBuilder) {
    this.validationForm = this.fb.group({
      birthdate: ['', [Validators.required]],
    });
  }

  onBirthDateInvalid(event: Event): void {
    const target = event.target as McInputDate;
    if (target.validity.rangeUnderflow) {
      this.errormessage = 'The date is underflown!';
    } else if (target.validity.rangeOverflow) {
      this.errormessage = 'The date is overflown!';
    } else {
      this.errormessage = '';
    }
  }

  onSubmit(): void {
    if (this.validationForm?.valid) {
      console.log('Form Submitted!', this.validationForm.value);
    }
  }
}
