import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageResourcesComponent } from './admin-manage-resources.component';

describe('AdminManageResourcesComponent', () => {
  let component: AdminManageResourcesComponent;
  let fixture: ComponentFixture<AdminManageResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageResourcesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManageResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
