import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';	
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username: string = "JSON";
  password: string = "Momo";



  usernameSecret: string = "N/A";

  submitted!: boolean;
  

  constructor(private monService: SessionService,
    private router: Router) {
   }

   ngOnInit(): void {
     
   }



   login() {
    this.submitted = true;
    this.monService.createSession(this.username, this.password).subscribe(
      {
        next : (token) => {  
          console.log("Token par login :" + token)
          setTimeout(() => {
            this.router.navigate(['/accueil'])
          }, 5000)
        },
        error: (err) => {
          console.log(err);

          // this.submitted=false;
        }
      });

  }


  recupererUsername(){
    this.monService.recupernom().subscribe(
      {
        next : (usernameSecret) => {  
          
          console.log("usernameSecret: " + usernameSecret.owner);
          this.usernameSecret = usernameSecret.owner;
        },
        error: (err) => {
          console.log(err);

          
        }
      }
    )
  }

}
