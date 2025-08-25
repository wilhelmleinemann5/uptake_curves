import { HttpClient } from '@angular/common/http';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  host: { class: 'mds-page mds-container' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, AsyncPipe],
  standalone: true,
})
export class ContentComponent {
  public isLoading = false;
  public hobbies: Observable<string[]> | undefined;
  public tags: string[] = ['ui', 'visual design', 'engineering', 'product'];
  public fit = 'medium';
  public isCardClickable = true;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  public onTagDismiss(dismissedTag: string): void {
    this.tags = this.tags.filter((tag) => tag !== dismissedTag);
  }

  public onTabChange(event: Event): void {
    const currentindex = (event as CustomEvent).detail;
    if (currentindex === 2) {
      this.hobbies = this.fetchHobbies();
    }
  }

  public fetchHobbies(): Observable<string[]> {
    this.isLoading = true;
    this.hobbies = undefined;
    return this.http
      .get<string[]>('/api/?type=all-meat&paras=3&start-with-lorem=1')
      .pipe(tap(() => (this.isLoading = false)));
  }

  public onFitChanged(fit: string): void {
    this.fit = fit;
  }

  public redirectToRoute(): void {
    this.router.navigate(['/tabbarrouter/2']);
  }
}
