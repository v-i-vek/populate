import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Question } from 'src/app/model/question';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-update-forum',
  templateUrl: './update-forum.component.html',
  styleUrls: ['./update-forum.component.css'],
})
export class UpdateForumComponent {
  public userId = localStorage.getItem('userId');
  public Editor: any = ClassicEditor;
  public maxLength: number = 2000;
  public question: any;
  public questionDescribe: any;
  public tags: any;
  public getTag: any;
  public queId: any;
  UpdateForumForm = new FormGroup({
    question: new FormControl('', [
      Validators.required,
      Validators.maxLength(119),
    ]),
    questionDescribe: new FormControl('', [
      Validators.required,
      Validators.maxLength(1500),
    ]),
  });

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

  allQuestion: Question[] = [];
  updatedAt: Date = new Date();
  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.question = this.quebyid.question;
    this.questionDescribe = this.quebyid.questionDescribe;
    this.getForumsById(this.queId);
  }
  get valide() {
    return this.UpdateForumForm.controls;
  }

  getForumsById(forum: Question) {
    this.route.paramMap.subscribe((params: any) => {
      const forum: string = params.get('_id');
      this.profileService.getForumById(forum!).subscribe(
        (res) => {
          this.quebyid = res;
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  editQuestion(quebyid: Question) {
    this.getForumsById(this.quebyid);
    this.question = quebyid.question;
    this.questionDescribe = quebyid.question;
    this.updatedAt = new Date();
  }
  updateForum() {
    this.userId = this.userId;
    this.profileService.updateForums(this.quebyid).subscribe(
      (res) => {
        this.allQuestion = [];
        this.editQuestion(this.quebyid);
        this.getForumsById(this.quebyid);
        this.router.navigate(['/manageforums']);
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
