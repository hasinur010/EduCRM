import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLevelModalComponent } from './add-level-modal.component';

describe('AddLevelModalComponent', () => {
  let component: AddLevelModalComponent;
  let fixture: ComponentFixture<AddLevelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLevelModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLevelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
