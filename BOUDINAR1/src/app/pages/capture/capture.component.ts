import { Component } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { FormsModule } from '@angular/forms';
import { interval, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-capture',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './capture.component.html',
  styleUrl: './capture.component.css'
})
export class CaptureComponent {

  descriptionPOST: string = 'TP PLSQL';

  descriptionPUT: string = 'TP WEB444';
  sessionService: any;
  isLoggedIn!: boolean;

  constructor(private monService: SessionService) { }
  tempsEcoule: string = '00:00:00';



  private sub: Subscription | null = null;
  private timerSub: Subscription | null = null;
  
  ngOnInit(): void {

    this.sessionService.tokenSubject.subscribe((token: any) => {
      this.isLoggedIn = !!token;
      if (this.isLoggedIn) {
        
        this.sub = this.sessionService.currentActivity$.subscribe((activity: { fin: { value: any; }; debut: { value: string; }; }) => {
          if (activity && !activity.fin.value) {
            this.startTimer(activity.debut.value);
          } else {
            this.stopTimer();
          }
        });

      }
    });


  }
  
  startTimer(start: string): void {
    this.stopTimer();
    const startTime = new Date(start).getTime();
    this.timerSub = interval(1000).subscribe(() => {
      const diff = Date.now() - startTime;
      this.tempsEcoule = this.formatElapsed(diff);
    });
  }
  formatElapsed(ms: number): string {
    const sec = Math.floor(ms / 1000) % 60;
    const min = Math.floor(ms / 60000) % 60;
    const hrs = Math.floor(ms / 3600000);
    return `${hrs.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
  }

  stopTimer(): void {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = null;
    }
    this.tempsEcoule = '00:00:00';
  }

  lancerActivite(descriptionPOST: string ): void {   

    this.monService.startActivite(descriptionPOST).subscribe(
      {
        next : (data) => {  
          console.log("Capture.lancerActivite() :" + descriptionPOST + " Feedback : " + data.msg );
        },
        error: (err) => {
          console.log("Capture.lancerActivite() " , err.error);
        }
      });
  }

  recupererActivites(): void {
    this.monService.getActivites().subscribe(
      {
        next : (data) => {  
          console.log("Capture.recupererActivites() Nombre d'activites : " + data.length);
        },
        error: (err) => {
          console.log("Capture.recupererActivites() " , err.error);
        }
      });
  }

  arreterActivite(): void {
    this.monService.stopActivite().subscribe(
      {
        next : (data) => {  
          console.log("Capture.arreterActivite() : " + data.msg);
        },
        error: (err) => {
          console.log("Capture.arreterActivite() " , err);
        }
      });
  }

  recupererActiviteCourante(): void {
    this.monService.getActiviteCourante().subscribe(
      {
        next : (data) => {  
          console.log("Capture.recupererActiviteCourante() DESCRIPTION: " + data);
        },
        error: (err) => {
          console.log("Capture.recupererActiviteCourante() " , err.error);
        }
      });
  }

  putActivite(descriptionPUT: string): void {
    this.monService.putActivite(descriptionPUT).subscribe(
      {
        next : (data) => {  
          console.log("Capture.putActivite() :" + descriptionPUT + " Feedback : " + data.description);
        },
        error: (err) => {
          console.log("Capture.putActivite() " , err.error);
        }
      });
  }


}
