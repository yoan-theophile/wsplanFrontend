import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingStudentPlanningComponent } from './working-student-planning.component';

describe('WorkingStudentPlanningComponent', () => {
  let component: WorkingStudentPlanningComponent;
  let fixture: ComponentFixture<WorkingStudentPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingStudentPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingStudentPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
