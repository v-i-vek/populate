import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageForumsComponent } from './admin-manage-forums.component';

describe('AdminManageForumsComponent', () => {
  let component: AdminManageForumsComponent;
  let fixture: ComponentFixture<AdminManageForumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageForumsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageForumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
