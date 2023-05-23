import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ProfileService } from 'src/app/service/profile.service';
import { Question } from 'src/app/model/question';
import { ForumService } from 'src/app/service/forum.service';
import { DeleteForumDialogComponent } from './delete-forum-dialog/delete-forum-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';

export interface tags {
  name: string;
}

@Component({
  selector: 'app-manageforums',
  templateUrl: './manageforums.component.html',
  styleUrls: ['./manageforums.component.css'],
})
export class ManageforumsComponent {
  [x: string]: any;
  question: any[] = [];
  quebyid: Question = {
    _id: '',
    userId: {
      firstName: '',
      lastName: '',
    },
    answer: {
      answer: '',
    },
    question: '',
    questionDescribe: '',
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  state = 'collapsed';
  public bookmark: string = 'bookmark_border';
  showMessage: true;
  response: any;
  public clickEvent() {
    if (this.bookmark === 'bookmark_border') {
      this.bookmark = 'bookmark';
    } else {
      this.bookmark = 'bookmark_border';
    }
  }

  public Editor = ClassicEditor;
  addOnBlur = true;

  public bookmarkget: any[] = [];
  public submited: boolean = false;
  public pagination: number = 1;
  public questionsget: any[] = [];
  public userId = localStorage.getItem('userId');

  constructor(
    public dialog: MatDialog,
    private profileservices: ProfileService,
    private forum: ForumService,
    private snackBar: MatSnackBar,
    private ngxLoader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.ngxLoader.start();
    const id: any = localStorage.getItem('userId');
    this.profileservices.getForumsById(id).subscribe(
      (response: any) => {
        this.question = response.data;
        this.ngxLoader.stop();
      },
      (err) => {
        console.log(err);
        this.ngxLoader.stop();
      }
    );
  }

  getQuestion() {
    this.forum.getQuestions().subscribe({
      next: (res) => {
        this.questionsget = res.data;
        this.getAnswerById();
        // console.log('test test', this.questionsget);
      },
      error: (err) => {
        alert('Error while fetching the data');
      },
    });
  }

  getAnswerById() {
    for (const question of this.questionsget) {
      this.forum.getAnswerById(question._id).subscribe((res: any) => {
        question.answer =
          res.data[0] === undefined ? { answer: '' } : res.data[0];
      });
    }
  }

  // bookmarks
  addBookmark(userId: any, questionId: any) {
    this.forum
      .addRemoveBookmark({
        userId: userId,
        questionId: questionId,
      })
      .subscribe({
        next: (res) => {
          this.bookmarkget.push(res);
          this.getBookmarkByUserId();
          // console.log(res);
          this.snackBar.open(res.message, 'Dismiss', commonSnackBarConfig);
        },
        error: (err) => {
          console.log('Error while sending the data ' + err);
        },
      });
  }

  toggleBookmark(questionId: string) {
    this.isBookmarked(questionId);
    // console.log('questionId', questionId);
    this.addBookmark(this.userId, questionId);
  }

  isBookmarked(questionId: string) {
    return this.bookmarkget?.some(
      (bookmark: any) => bookmark.questionId === questionId
    );
  }

  getBookmarkByUserId() {
    // console.log(this.userId);
    this.forum.getBookmarkByUserId(this.userId).subscribe({
      next: (res) => {
        this.bookmarkget = res.data;
        // console.log('bookmark get: ', this.bookmarkget);
      },
      error: (err) => {
        console.log('Error while sending the data ' + err);
      },
    });
  }

  deleteForumDialog(_id: any): void {
    const dialogRef = this.dialog.open(DeleteForumDialogComponent, {
      width: 'auto',
      data: _id,
      disableClose: true,
    });
  }
}
