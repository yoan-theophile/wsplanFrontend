import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningTableOverviewComponent } from './planning-table-overview.component';

describe('PlanningTableOverviewComponent', () => {
  let component: PlanningTableOverviewComponent;
  let fixture: ComponentFixture<PlanningTableOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningTableOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanningTableOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
