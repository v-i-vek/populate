import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificBlogComponent } from './specific-blog.component';

describe('SpecificBlogComponent', () => {
  let component: SpecificBlogComponent;
  let fixture: ComponentFixture<SpecificBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
