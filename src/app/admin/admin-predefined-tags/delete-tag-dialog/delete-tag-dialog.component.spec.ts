import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTagDialogComponent } from './delete-tag-dialog.component';

describe('DeleteTagDialogComponent', () => {
  let component: DeleteTagDialogComponent;
  let fixture: ComponentFixture<DeleteTagDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTagDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTagDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
