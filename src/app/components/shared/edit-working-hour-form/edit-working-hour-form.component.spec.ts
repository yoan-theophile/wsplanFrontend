import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkingHourFormComponent } from './edit-working-hour-form.component';

describe('EditWorkingHourFormComponent', () => {
  let component: EditWorkingHourFormComponent;
  let fixture: ComponentFixture<EditWorkingHourFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkingHourFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWorkingHourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
