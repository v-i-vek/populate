import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPredefinedTagsComponent } from './admin-predefined-tags.component';

describe('AdminPredefinedTagsComponent', () => {
  let component: AdminPredefinedTagsComponent;
  let fixture: ComponentFixture<AdminPredefinedTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPredefinedTagsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPredefinedTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
