import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBlogDialogComponent } from './delete-blog-dialog.component';

describe('DeleteBlogDialogComponent', () => {
  let component: DeleteBlogDialogComponent;
  let fixture: ComponentFixture<DeleteBlogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBlogDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBlogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
