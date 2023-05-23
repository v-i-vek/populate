import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagebookmarksComponent } from './managebookmarks.component';

describe('ManagebookmarksComponent', () => {
  let component: ManagebookmarksComponent;
  let fixture: ComponentFixture<ManagebookmarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagebookmarksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagebookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
