import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './modules/mat/mat.module';
import { ManagebookmarksComponent } from './profile/managebookmarks/managebookmarks.component';
import { ManageforumsComponent } from './profile/manageforums/manageforums.component';
import { ManageresourcesComponent } from './profile/manageresources/manageresources.component';
import { ProfileComponent } from './profile/profile.component';
import { AdddocumentComponent } from './resources/adddocument/adddocument.component';
import { ResourcesdocumentComponent } from './profile/manageresources/resourcesdocument/resourcesdocument.component';
import { HttpClientModule } from '@angular/common/http';
import { AddblogComponent } from './resources/addblog/addblog.component';
import { BlogComponent } from './resources/blog/blog.component';
import { DocumentComponent } from './resources/document/document.component';
import { SpecificBlogComponent } from './resources/specific-blog/specific-blog.component';
import { SpecificDocumentComponent } from './resources/specific-document/specific-document.component';
import { DocumentService } from './service/document.service';
import { SafePipe } from './pipes/safe.pipe';
import { ResourcesComponent } from './resources/resources.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SigninSignupComponent } from './layout/header/signin-signup/signin-signup.component';
import { ForgotpasswordComponent } from './layout/header/forgotpassword/forgotpassword.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieInterceptor } from './service/cookie.interceptor';
import { ResetPasswordComponent } from './layout/header/forgotpassword/reset-password/reset-password.component';
import { CreatequestionComponent } from './forum/createquestion/createquestion.component';
import { QuestioncardComponent } from './forum/questioncard/questioncard.component';
import { QueanspageComponent } from './forum/queanspage/queanspage.component';
import { ResourcesblogComponent } from './profile/manageresources/resourcesblog/resourcesblog.component';
import { UpdateBlogComponent } from './profile/manageresources/resourcesblog/update-blog/update-blog.component';

import { AvatarModule } from 'ngx-avatars';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
  SPINNER,
  POSITION,
  PB_DIRECTION,
} from 'ngx-ui-loader';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminManageForumsComponent } from './admin/admin-manage-forums/admin-manage-forums.component';
import { AdminManageUsersComponent } from './admin/admin-manage-users/admin-manage-users.component';
import { AdminManageResourcesComponent } from './admin/admin-manage-resources/admin-manage-resources.component';
import { AdminPredefinedTagsComponent } from './admin/admin-predefined-tags/admin-predefined-tags.component';
import { AddTagComponent } from './admin/admin-predefined-tags/add-tag/add-tag.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DeleteDialogComponent } from './admin/admin-manage-users/delete-dialog/delete-dialog.component';
import { DeleteTagDialogComponent } from './admin/admin-predefined-tags/delete-tag-dialog/delete-tag-dialog.component';
import { DeleteBlogDialogComponent } from './admin/admin-manage-resources/delete-blog-dialog/delete-blog-dialog.component';
import { DeleteDocumentDialogComponent } from './admin/admin-manage-resources/delete-document-dialog/delete-document-dialog.component';
import { GetDocumentsComponent } from './admin/admin-manage-resources/get-documents/get-documents.component';
import { UpdateForumComponent } from './profile/manageforums/update-forum/update-forum.component';
import { DeleteForumDialogComponent } from './profile/manageforums/delete-forum-dialog/delete-forum-dialog.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#00b8d4',
  fgsPosition: 'center-center',
  fgsSize: 60,
  fgsType: 'wandering-cubes',
  gap: 24,
  logoPosition: 'center-center',
  logoSize: 80,
  logoUrl: '',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: 'red',
  pbDirection: 'ltr',
  pbThickness: 3,
  hasProgressBar: false,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300,
};

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      '|',
      '|',
      'undo',
      'redo',
    ],
  },
  image: {
    toolbar: [
      'imageStyle:full',
      'imageStyle:side',
      '|',
      'imageTextAlternative',
    ],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
  language: 'en',
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardComponent,

    QuestioncardComponent,
    CreatequestionComponent,
    QueanspageComponent,
    AddblogComponent,
    ResourcesComponent,
    BlogComponent,
    DocumentComponent,
    UpdateForumComponent,
    SpecificBlogComponent,
    SpecificDocumentComponent,
    SafePipe,
    UpdateBlogComponent,
    ManagebookmarksComponent,
    ManageforumsComponent,
    DeleteForumDialogComponent,
    ManageresourcesComponent,
    ProfileComponent,
    ResourcesblogComponent,
    ResourcesdocumentComponent,
    AdddocumentComponent,
    LayoutComponent,
    HeaderComponent,
    SigninSignupComponent,
    ForgotpasswordComponent,
    SidenavComponent,
    ResetPasswordComponent,
    AdminManageForumsComponent,
    AdminManageUsersComponent,
    DeleteDialogComponent,
    AdminManageResourcesComponent,
    AdminPredefinedTagsComponent,
    AddTagComponent,
    DeleteTagDialogComponent,
    DeleteBlogDialogComponent,
    DeleteDocumentDialogComponent,
    GetDocumentsComponent,
    UpdateBlogComponent,
    UpdateForumComponent,
    DeleteForumDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    HttpClientModule,
    AvatarModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    CKEditorModule,
  ],
  providers: [
    DocumentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CookieInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
