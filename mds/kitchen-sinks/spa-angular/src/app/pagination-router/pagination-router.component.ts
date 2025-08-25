import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pagination-router',
  templateUrl: './pagination-router.component.html',
  styleUrls: ['./pagination-router.component.scss'],
  host: { class: 'mds-page mds-container' },
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule, CommonModule, AsyncPipe],
  standalone: true,
})
export class PaginationRouterComponent implements OnInit {
  public id$: Observable<string | null> | undefined;
  public currentIndex$?: BehaviorSubject<number> = new BehaviorSubject(0);
  public pages = Array.from({ length: 20 }, (_, i) => i + 1);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id$ = this.route.paramMap.pipe(map((params: ParamMap) => params.get('id')));
    this.id$.subscribe((param) => {
      this.currentIndex$?.next(param ? +param : 0);
    });
  }
}
