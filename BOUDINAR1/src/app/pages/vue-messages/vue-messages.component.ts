import { Component } from '@angular/core';
import { MessagesService } from '../../service/messages.service';
import { IVueMessage } from '../../interface/httpResponse';
import { Observable } from 'rxjs';
import { SessionService } from '../../service/session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vue-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vue-messages.component.html',
  styleUrl: './vue-messages.component.css'
})
export class VueMessagesComponent {
   messages$!: Observable<IVueMessage[]>;

   _message : string = "LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL";
    _rating : number = 88;

  constructor(public messagesService: SessionService) { 
    // this.messages$ = this.messagesService.recupererMessages().subscribe();
    // console.log("VueMessagesComponent.constructor() : " , this.messages$);
  }

  ngOnInit(): void { 
    this.messages$ = this.messagesService.recupererMessages();
  }

  recupererMessages() {
    this.messagesService.recupererMessages().subscribe(
      {
        next: (data) => {
          console.log("VueMessages.recupereMessages() : " , data);
        },
        error: (err) => {
          console.log("VueMessages.recupereMessages() : " , err);

        }
      }
      // console.log("VueMessagesComponent.recupereMessages() : " , );
    );
    }

    postMessage() {
      this.messagesService.postMessage(this._message, this._rating).subscribe(
        {
          next: (data) => {
            console.log("VueMessages.postMessage() : " , data);
          },
          error: (err) => {
            console.log("VueMessages.postMessage() : " , err);
  
          }
        }
      );
      }

    canDelete(msg: IVueMessage): boolean {
      return msg.userid === '' || msg.userid === this.messagesService._userNameSecret;
    }

    deleteMessage(messageId: string) {
      this.messagesService.deleteMessage(messageId).subscribe({
        next: () => {
          console.log("Message effacé, ID=", messageId);
          // recharger la liste
          // this.recupererMessages();
          
        },
        error: (err) => {
          console.error("Erreur à la suppression", err);
        }
      });
    }

    

}
