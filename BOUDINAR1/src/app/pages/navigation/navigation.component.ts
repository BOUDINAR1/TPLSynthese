import { NgClass, NgIf } from '@angular/common';
import { Component, Output, EventEmitter, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
import { SessionService } from '../../service/session.service';
import { BehaviorSubject, interval, Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgClass, NgIf,  FormsModule, RouterModule],
  templateUrl: './navigation.component.html',
  // styleUrl: './navigation.component.css'
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent {
  isLoggedIn: boolean = false;

  username!: string;
 
  nbMessages: number = 0;

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService.tokenSubject.subscribe(token => {
      this.isLoggedIn = !!token;
      if (this.isLoggedIn) {
        this.sessionService.recupernom().subscribe();
      }
    });

    this.sessionService.usernameSubject.subscribe(user => {
      this.username = user;
    });

    this.sessionService.getNbMessages().subscribe(count => {
      this.nbMessages = count;
    });

    
  }





  logout(): void {
    this.sessionService.logout();
  }

}

