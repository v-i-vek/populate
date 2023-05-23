import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageforumsComponent } from './profile/manageforums/manageforums.component';
import { ManagebookmarksComponent } from './profile/managebookmarks/managebookmarks.component';
import { ManageresourcesComponent } from './profile/manageresources/manageresources.component';
import { ResourcesdocumentComponent } from './profile/manageresources/resourcesdocument/resourcesdocument.component';
import { ResourcesComponent } from './resources/resources.component';
import { QuestioncardComponent } from './forum/questioncard/questioncard.component';
import { QueanspageComponent } from './forum/queanspage/queanspage.component';
import { CreatequestionComponent } from './forum/createquestion/createquestion.component';
import { SpecificBlogComponent } from './resources/specific-blog/specific-blog.component';
import { AddblogComponent } from './resources/addblog/addblog.component';
import { SpecificDocumentComponent } from './resources/specific-document/specific-document.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './service/auth.guard';
import { ResetPasswordComponent } from './layout/header/forgotpassword/reset-password/reset-password.component';
import { AdminManageForumsComponent } from './admin/admin-manage-forums/admin-manage-forums.component';
import { AdminManageResourcesComponent } from './admin/admin-manage-resources/admin-manage-resources.component';
import { AdminManageUsersComponent } from './admin/admin-manage-users/admin-manage-users.component';
import { AdminPredefinedTagsComponent } from './admin/admin-predefined-tags/admin-predefined-tags.component';
import { UpdateBlogComponent } from './profile/manageresources/resourcesblog/update-blog/update-blog.component';
import { UpdateForumComponent } from './profile/manageforums/update-forum/update-forum.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'admin/manageusers',
    canActivate: [AuthGuard],
    component: AdminManageUsersComponent,
  },
  {
    path: 'resources',
    canActivate: [AuthGuard],
    component: ResourcesComponent,
  },
  { path: 'queanspage/:id', component: QueanspageComponent },
  { path: 'questiondash', component: QuestioncardComponent },
  {
    path: 'createquestion',
    canActivate: [AuthGuard],
    component: CreatequestionComponent,
  },
  {
    path: 'admin/manageforums',
    canActivate: [AuthGuard],
    component: AdminManageForumsComponent,
  },
  {
    path: 'admin/manageresourcs',
    canActivate: [AuthGuard],
    component: AdminManageResourcesComponent,
  },

  {
    path: 'admin/tags',
    canActivate: [AuthGuard],
    component: AdminPredefinedTagsComponent,
  },
  {
    path: 'manageforums',
    canActivate: [AuthGuard],
    component: ManageforumsComponent,
  },
  {
    path: 'managebookmarks',
    canActivate: [AuthGuard],
    component: ManagebookmarksComponent,
  },
  {
    path: 'manageresources',
    canActivate: [AuthGuard],
    component: ManageresourcesComponent,
  },
 
  {
    path: 'resourcesdocuments',
    canActivate: [AuthGuard],
    component: ResourcesdocumentComponent,
  },
 
  {
    path: 'blog/:id',
    canActivate: [AuthGuard],
    component: SpecificBlogComponent,
  },
  { path: 'addblog', canActivate: [AuthGuard], component: AddblogComponent },
  {
    path: 'document/:_id',
    canActivate: [AuthGuard],
    component: SpecificDocumentComponent,
  },
  {
    path: 'forgotpassword/reset-password/:id',
    component: ResetPasswordComponent,
  },
  { path: 'update-blog/:_id', canActivate: [AuthGuard],component: UpdateBlogComponent },
  { path: 'update-forum/:_id', canActivate: [AuthGuard],component: UpdateForumComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
