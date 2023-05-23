import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteForumDialogComponent } from './delete-forum-dialog.component';

describe('DeleteForumDialogComponent', () => {
  let component: DeleteForumDialogComponent;
  let fixture: ComponentFixture<DeleteForumDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteForumDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteForumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
