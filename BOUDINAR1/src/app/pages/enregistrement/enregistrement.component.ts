import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enregistrement',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './enregistrement.component.html',
  styleUrl: './enregistrement.component.css'
})
export class EnregistrementComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  key: string = '';

  constructor(private monService: SessionService) { }

  createUser(username: string, password: string, email: string, key: string): void {   

    this.monService.createUser(username, password, email, key).subscribe(
      {
        next : (data) => {  
          console.log("Enregistrement.createUser() :" + data);
        },
        error: (err) => {
          console.log("Enregistement.createUser() " , err);
        }
      });
  }
}
