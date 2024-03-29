//ANGULAR CORE
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RootComponent } from './components/root/root.component';

// COMPONENTS

const routes: Routes = [

  {
    path: "",
    component: RootComponent
  },
  // LOGIN
  {
    path: "auth",
    loadChildren: () => import('./feat-modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./feat-modules/menu/menu.module').then(m => m.MenuModule)
  },

  // REDIRECT TO HOME PAGE
  {
    path: "",
    redirectTo: "/",
    pathMatch: 'full'
  },

  // HANDLE PAGE-NOT-FOUND
  {
    path: "**",
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }



