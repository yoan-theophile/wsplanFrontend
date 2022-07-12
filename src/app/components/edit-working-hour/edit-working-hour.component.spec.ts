import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkingHourComponent } from './edit-working-hour.component';

describe('EditWorkingHourComponent', () => {
  let component: EditWorkingHourComponent;
  let fixture: ComponentFixture<EditWorkingHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWorkingHourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWorkingHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
