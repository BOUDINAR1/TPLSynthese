import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { VueMessagesComponent } from './pages/vue-messages/vue-messages.component';
import { EnregistrementComponent } from './pages/enregistrement/enregistrement.component';
import { CaptureComponent } from './pages/capture/capture.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { AccueilComponent } from './pages/accueil/accueil.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, VueMessagesComponent, EnregistrementComponent, CaptureComponent, NavigationComponent, AccueilComponent, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AppCaptureDeTempsVF';

}
