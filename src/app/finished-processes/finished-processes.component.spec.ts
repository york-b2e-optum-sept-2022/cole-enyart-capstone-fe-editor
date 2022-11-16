import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedProcessesComponent } from './finished-processes.component';

describe('FinishedProcessesComponent', () => {
  let component: FinishedProcessesComponent;
  let fixture: ComponentFixture<FinishedProcessesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedProcessesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
