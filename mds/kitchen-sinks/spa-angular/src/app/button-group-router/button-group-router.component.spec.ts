import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGroupRouterComponent } from './button-group-router.component';

describe('ContentComponent', () => {
  let component: ButtonGroupRouterComponent;
  let fixture: ComponentFixture<ButtonGroupRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonGroupRouterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGroupRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
