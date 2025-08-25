import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentedControlRouterComponent } from './segmented-control-router.component';

describe('ContentComponent', () => {
  let component: SegmentedControlRouterComponent;
  let fixture: ComponentFixture<SegmentedControlRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SegmentedControlRouterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentedControlRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
