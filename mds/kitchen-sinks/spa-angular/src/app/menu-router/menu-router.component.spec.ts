import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRouterComponent } from './menu-router.component';

describe('ContentComponent', () => {
  let component: MenuRouterComponent;
  let fixture: ComponentFixture<MenuRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuRouterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
