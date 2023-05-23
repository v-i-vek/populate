import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-manage-forums',
  templateUrl: './admin-manage-forums.component.html',
  styleUrls: ['./admin-manage-forums.component.css']
})
export class AdminManageForumsComponent {
  public allQuestions: any;
  constructor(private admin: AdminService) {}

  getQuestions() {
    this.admin.getQuestions().subscribe(
      (res) => {
        this.allQuestions = res.data;
        if(this.allQuestions)
        this.getAnswerById();
        console.log("Admin Side Question: ",res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAnswerById() {
    for (const question of this.allQuestions) {
      this.admin.getAnswerById(question._id).subscribe((res: any) => {
        question.answer =
          res.data === undefined ? { answer: '' } : res.data;
      });
    }
  }

  deleteQuestion(queId: string) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this User?'
    );
    if (confirmed) {
      this.admin.deleteQuestion(queId).subscribe(
        (response) => {
          console.log(response);
          this.getQuestions()
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  deleteAnswer(ansId: string) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this User?'
    );
    if (confirmed) {
      this.admin.deleteAnswer(ansId).subscribe(
        (response) => {
          console.log(response);
          this.getQuestions()
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  ngOnInit(): void {
    this.getQuestions();
  }

}
