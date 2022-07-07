import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkingHourFormComponent } from './add-working-hour-form.component';

describe('AddWorkingHourFormComponent', () => {
  let component: AddWorkingHourFormComponent;
  let fixture: ComponentFixture<AddWorkingHourFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWorkingHourFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWorkingHourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
