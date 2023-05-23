import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageforumsComponent } from './manageforums.component';

describe('ManageforumsComponent', () => {
  let component: ManageforumsComponent;
  let fixture: ComponentFixture<ManageforumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageforumsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageforumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
