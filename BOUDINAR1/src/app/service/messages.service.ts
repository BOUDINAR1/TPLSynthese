import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMessage, IVueMessage } from '../interface/httpResponse';
import { environment } from '../../environments/environments';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  recupererMessages(): Observable<IVueMessage> {
    return this.http.get<IVueMessage>(environment.serveur + "commentaire").pipe(
      tap(data => console.log("messages.service.recupererMessages() : " , data)

      )
    );
  }

  postMessage(message: string, rating: number): Observable<IMessage> {

    
    return this.http.post<IMessage>(
      environment.serveur + "commentaire",
      { 
        "message": message,
         "rating" : rating
      }).pipe(
      tap(data => console.log("messages.service.postMessage() : " , data)

      )
    );
  }

}
