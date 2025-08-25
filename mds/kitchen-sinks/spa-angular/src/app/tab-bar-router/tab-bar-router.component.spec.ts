import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBarRouterComponent } from './tab-bar-router.component';

describe('ContentComponent', () => {
  let component: TabBarRouterComponent;
  let fixture: ComponentFixture<TabBarRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabBarRouterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabBarRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
