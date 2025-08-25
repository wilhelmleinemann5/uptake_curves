import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationRouterComponent } from './pagination-router.component';

describe('ContentComponent', () => {
  let component: PaginationRouterComponent;
  let fixture: ComponentFixture<PaginationRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationRouterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
