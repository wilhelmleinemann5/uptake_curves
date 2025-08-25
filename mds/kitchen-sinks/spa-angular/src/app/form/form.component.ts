import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import countries from './countries';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  host: { class: 'mds-page mds-container' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class FormComponent {
  public form: FormGroup;
  public currentStepIndex = 0;
  public open = false;
  public steps = ['Personal', 'Interests', 'Work'];
  public countries = countries;
  public genders = ['Female', 'Male', 'Non-binary', 'Transgender', 'Intersex', 'I prefer not to say'];
  public hobbies = ['Sport', 'Music', 'Art', 'Movies', 'Gaming', 'Books'];
  public skills = ['Javascript', 'React', 'Angular', 'VueJS', 'Go'];
  public helloWorld = '';
  public fit = 'medium';
  public showTooltip = true;
  public mask = /^[0-9A-Z]{0,4}$/; // 4 characters only, accepts digits and uppercase letters

  public constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      // fullname: [null, Validators.required],
      fullname: null,
      tel: null,
      street: [{ value: 'This is your default street', disabled: true }],
      travelPeriod: null,
      country: null,
      company: null,
      birthday: null,
      gender: [],
      hobbies: [],
      comments: null,
      employed: '0',
      skills: null,
      terms: 'agreed',
    });
  }

  public showFormValues(): void {
    this.open = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.form?.value);
  }

  public submit(event: Event): void {
    event.preventDefault();
    alert('From submitted');
  }

  public onEnterHandler(): void {
    this.helloWorld = 'hello';
    console.log('enter pressed');
  }

  public onInputHandler(event: Event): void {
    console.log(event);
  }

  public onFitChanged(fit: string): void {
    this.fit = fit;
  }
}
