import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminComponent } from './admin/admin.component';
import { AssistantComponent } from './assistant/assistant.component';
import { CreatUserComponent } from './creat-user/creat-user.component';
import { LoginComponent } from './login/login.component';
import { SuperComponent } from './super/super.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'create', component: CreatUserComponent},
  {path:'super', component: SuperComponent},
  {path:'admin', component: AdminComponent},
  {path:'assistant', component: AssistantComponent},
  {path:'users', component: UsersComponent},
  {path:'admin-user', component: AdminUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
