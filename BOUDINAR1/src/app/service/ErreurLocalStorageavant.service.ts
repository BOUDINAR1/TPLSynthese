import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environments';
import { IActiviteGET, IActivitePUT, IFeedback, IMessage, ISecret, IVueMessage } from '../interface/httpResponse';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private http: HttpClient
  ) {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      this._token = savedToken;
      this._tokenSubject.next(this._token);
      // Option 1 : appeler recupernom() pour récupérer le nom si le token est valide
      this.recupernom().subscribe({
        error: () => {
          // Si erreur, logout
          this.logout();
        }
      });
    }

   }
  _token: string = "";
  _userNameSecret: string = "";
  
  _usernameSubject = new BehaviorSubject<string>(this._userNameSecret);

  get usernameSubject(): Observable<string> {
    return this._usernameSubject.asObservable();
  }

  private _tokenSubject = new BehaviorSubject<string | null>(null);

  get tokenSubject(): Observable<string | null> {
    return this._tokenSubject.asObservable();
  }



  isConnected(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== ''; 
  }
  

 
// Idee : Envoyer le id et pw puis recuper le token 

// 1- Envoyer le id et pw 
// On utilise la methode post dans la quelle on met l'url et le body

// 2- Recuperer le token 
// cette methode retourne un observable de type string qui est le token
// on utilise le pipe pour recuperer le token et le stocker dans une variable locale 


  createSession(username: string, password: string): Observable<String> {

    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"   
      })
    };

    return this.http.post<string>(environment.serveur + "session",
      {
        "username": username,
        "password": password
      },
      httpOptions).pipe(
        tap((token) => {
          this._token = token;
            localStorage.setItem('token', this._token);
            console.log('service.createSession :Token stocké localStorage');
            this._tokenSubject.next(token);

          



          }   
        ));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    }

  // Recuperer username en utilisant le token et l'API secret

  recupernom(): Observable<ISecret> {

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this._token});

    return this.http.get<ISecret>(environment.serveur + "secret", {headers: headers})
    .pipe(
      tap((data) => {
        console.log("service.recupernom() owner: " , data.owner);
        this._userNameSecret = data.owner;
        this._usernameSubject.next(this._userNameSecret);
      }
      )
    )
    };

    
    recupererMessages(): Observable<IVueMessage> {
      return this.http.get<IVueMessage>(environment.serveur + "commentaire").pipe(
        tap(data => console.log("service.recupererMessages() : " , data)
  
        )
      );
    }
  
    postMessage(message: string, rating: number): Observable<IMessage> {
  
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this._token});
      

      return this.http.post<IMessage>(
        environment.serveur + "commentaire",
        { 
          "message": message,
           "rating" : rating
        },
      {headers : headers}).pipe(
        tap(data => console.log("service.postMessage() : " , data)
  
        )
      );
    }

    deleteMessage(messageId: string): Observable<any> {
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this._token
      });
  
      return this.http.delete(environment.serveur + "commentaire/" + messageId , { headers })
        .pipe(
          tap(() => console.log("MessagesService.deleteMessage() : i dud message supprimé ", messageId ))
        );
    }
  
    createUser(username: string, password: string, email: string, key: string): Observable<String> {   

      const url: string = environment.serveur + "create-user";

      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this._token});

      const body: any | null = {
        "username": username,
        "password": password,
        "email": email,
        "key": key
      };
       
      return this.http.post<string>(url, body, {headers: headers}).pipe(
        tap(data => console.log("service.createUser() : " , data)
        )
      )

        
    }
// SECTION GESTION DE TEMPS /activite et /activites 
    startActivite(description: string): Observable<IFeedback> {

      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this._token});
        console.log("service.startActivite() , Verifier token : " , this._token);

      return this.http.post<IFeedback>(
        environment.serveur + "activite",
        { "description": description},
         { headers : headers}
        ).pipe(
        tap(data => console.log("service.startActivite() Response: " , data.msg)
  
        )
      );
    }

    getActivites(): Observable<IActiviteGET[]> {
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this._token});
        console.log("service.getActivites() , Verifier token : " , this._token);

      return this.http.get<IActiviteGET[]>(environment.serveur + "activites", { headers : headers}).pipe(
        tap(data => console.log("service.getActivites() Response: " , data)
  
        )
      );
    }

    stopActivite(): Observable<IFeedback> {

      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this._token});
        console.log("service.stopActivite() , Verifier token : " , this._token);

      return this.http.delete<IFeedback>(
        environment.serveur + "activite",
          { headers : headers}
        ).pipe(
        tap(data => console.log("service.stopActivite() Response: " , data.msg)
  
        )
      );
    }

    getActiviteCourante(): Observable<IActiviteGET> {
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this._token});

      console.log("service.getActiviteCourante() , Verifier token : " , this._token);

      return this.http.get<IActiviteGET>(environment.serveur + "activite", { headers : headers}).pipe(
        tap(data => console.log("service.getActiviteCourante() Response: " , data)
        )
      );
    }

    // getActivites(): Observable<IActivite[]> {
    //   const headers = new HttpHeaders({
    //     "Content-Type": "application/json",
    //     Authorization: this._token});
    //     console.log("service.getActivite() , Verifier token : " , this._token);

    //   return this.http.get<IActivite[]>(environment.serveur + "activite", { headers : headers}).pipe(
    //     tap(data => console.log("service.getActivite() Response: " , data)
  
    //     )
    //   );
    // }

    putActivite(description: string): Observable<IActivitePUT> {  
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this._token});

      return this.http.put<IActivitePUT>(
        environment.serveur + "activite",
        { "description": description,
          "start": "2021-08-01T08:00:00.000Z",
          "end": "2021-08-01T12:00:00.000Z"
        },
        { headers : headers}
        ).pipe(
        tap(data => console.log("service.putActivite() Response: " , data)
  
        )
      );
    }

   
  
  
    logout(): void {
      localStorage.removeItem('token');
      this._tokenSubject.next(null);
      this._token = "";
    }

}

