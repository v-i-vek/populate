import { ChangeDetectorRef, Component } from '@angular/core';
import { Input } from '@angular/core';
import { ForumService } from 'src/app/service/forum.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/question';
import { Answer } from 'src/app/model/answer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { commonSnackBarConfig } from 'src/app/service/snackbar-config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { log } from 'console';

@Component({
  selector: 'app-queanspage',
  templateUrl: './queanspage.component.html',
  styleUrls: ['./queanspage.component.css'],
})
export class QueanspageComponent {
  public answord: string = 'Answer';
  public submited: boolean = false;
  public queId: any;
  userId = localStorage.getItem('userId');

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

  answers: Answer = {
    _id: '',
    userId: {
      firstName: '',
      lastName: '',
    },
    questionId: {
      _id: '',
    },
    answer: '',
    upvotes: [],
    downvotes: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  public ansbyid: any[] = [this.answers];

  public Editor = ClassicEditor;

  PostAnswer = new FormGroup({
    answer: new FormControl('', [
      Validators.required,
      Validators.maxLength(1200),
    ]),
  });
  upvote: any;
  downvote: any;
  bookmarkget: any;
  resmsg: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private forum: ForumService,
    private  snackBar:MatSnackBar,
    private changeDetector: ChangeDetectorRef
  ) {}

  get valide() {
    return this.PostAnswer.controls;
  }

  answerVotes: { [answerId: string]: 'up' | 'down' | null } = {};

  answerVote: {[key: string]: {upvotes: any[], downvotes: any[]} | null} = {};

 
    isUpVoted(answerId:any) {
      return this.ansbyid?.some((upVote) => upVote.upvotes.userId === this.userId,
      this.answerVotes[answerId] = 'up'
      );
    }
  upvotesAnswer(id: any) {
    console.log(id);
    console.log(this.userId);
    this.forum.upvotesAnswer(id, { upvotes: this.userId }).subscribe(
      (res) => {
        this.upvote = res;
        this.answerVote[id]!.upvotes = res.upvotes;
        console.log(res);
        this.getAnswerById();
        this.changeDetector.detectChanges();
        this.snackBar.open(res.message, 'Dismiss', commonSnackBarConfig);
      },
      (error) => {
        this.snackBar.open(
          error.error.message,
          'Dismiss',
          commonSnackBarConfig
        );
      }
    );
  }
  
  downvotesAnswer(id: any) {
    console.log(id);
    console.log(this.userId);
    this.forum.downvotesAnswer(id, { downvotes: this.userId }).subscribe(
      (res) => {
        this.downvote = res;
        this.answerVote[id]!.downvotes = res.downvotes;
        console.log("resdownvotesssss",res.downvotes);
        console.log(res);
        this.getAnswerById();
        this.changeDetector.detectChanges();
        this.snackBar.open(res.message, 'Dismiss', commonSnackBarConfig);
      },
      (error) => {
        this.snackBar.open(
          error.error.message,
          'Dismiss',
          commonSnackBarConfig
        );
      }
    );
  }
  
  getQuestionById() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.queId = params.get('id');
      this.forum.getQuestionById(params.get('id')).subscribe((res: any) => {
        this.quebyid = res.data;
        console.log(res.data);
      });
    });
  }

  getAnswerById() {
    this.activatedRoute.paramMap.subscribe((params) => {
      console.log('ID : ' + params.get('id'));
      this.forum.getAnswerById(params.get('id')).subscribe((res: any) => {
        this.ansbyid = res.data;
        this.ansbyid.forEach((answer: any) => {
          this.answerVote[answer._id] = {upvotes: answer.upvotes, downvotes: answer.downvotes};
          console.log('comingggggggggggggg', this.answerVote[answer._id]);
        });
        console.log('coming................', res.data);
      });
    });
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
          // this.getQuestion();
          this.getBookmarkByUserId();
          console.log(res);
          this.snackBar.open(res.message, 'Dismiss', commonSnackBarConfig);
        },
        error: (err) => {
          console.log('Error while sending the data ' + err);
        },
      });
  }

  toggleBookmark(questionId: string) {
    this.isBookmarked(questionId);
    console.log('questionId', questionId);
    this.addBookmark(this.userId, questionId);
  }

  isBookmarked(questionId: string) {
    return this.bookmarkget?.some(
      (bookmark: any) => bookmark.questionId === questionId
    );
  }

  getBookmarkByUserId() {
    console.log(this.userId);
    this.forum.getBookmarkByUserId(this.userId).subscribe({
      next: (res) => {
        this.bookmarkget = res.data;
        console.log('bookmark get: ', this.bookmarkget);
      },
      error: (err) => {
        console.log('Error while sending the data ' + err);
      },
    });
  }

  ngOnInit() {
    this.getQuestionById();
    this.getAnswerById();
    this.getBookmarkByUserId();

  }

  answerSubmit() {
    this.submited = true;
    if (this.PostAnswer.invalid) return;

    console.log(this.PostAnswer.value);
    this.forum
      .postAnswer({
        ...this.PostAnswer.value,
        questionId: this.queId,
        userId: this.userId,
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.snackBar.open(res.message, 'Dismiss', commonSnackBarConfig);
        },
        error: (err) => {
          console.log('Error while sending the data ' + err);
        },
      });
  }
}
