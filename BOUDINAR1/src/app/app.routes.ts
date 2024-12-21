import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CaptureComponent } from './pages/capture/capture.component';
import { VueMessagesComponent } from './pages/vue-messages/vue-messages.component';
import { AccueilComponent } from './pages/accueil/accueil.component';

export const routes: Routes = [
        {
          path: 'login', component: LoginComponent
        },
        {
            path: 'capture', component: CaptureComponent
        },
        {
         path: 'messages', component: VueMessagesComponent
        },
        {
             path: 'accueil', component: AccueilComponent
        },


        // {
        //   path: 'aide', component: AideComponent,
        //   children: [
        //     {
        //       path: ':id',
        //       component: DetailsComponent
        //     }
        //   ]
        // },


        {
            path: "",
            redirectTo: "/accueil",
            pathMatch: "full"
          },
          {
            path: "**",
            redirectTo: "/accueil",
            pathMatch: "full"
          }

];
