import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-button-group-router',
  templateUrl: './button-group-router.component.html',
  styleUrls: ['./button-group-router.component.scss'],
  host: { class: 'mds-page mds-container' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, AsyncPipe],
  standalone: true,
})
export class ButtonGroupRouterComponent implements OnInit {
  public id$: Observable<string | null> | undefined;
  public currentIndex$?: BehaviorSubject<number> = new BehaviorSubject(1);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id$ = this.route.paramMap.pipe(map((params: ParamMap) => params.get('id')));
    this.id$.subscribe((param) => {
      this.currentIndex$?.next(param ? +param : 1);
    });
  }
}
