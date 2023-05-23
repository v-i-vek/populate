import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageresourcesComponent } from './manageresources.component';

describe('ManageresourcesComponent', () => {
  let component: ManageresourcesComponent;
  let fixture: ComponentFixture<ManageresourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageresourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageresourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
