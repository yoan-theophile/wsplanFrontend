import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyPlanningOverviewComponent } from './weekly-planning-overview.component';

describe('WeeklyPlanningOverviewComponent', () => {
  let component: WeeklyPlanningOverviewComponent;
  let fixture: ComponentFixture<WeeklyPlanningOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyPlanningOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyPlanningOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
