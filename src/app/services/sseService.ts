import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import { MessageModel } from "../model/message";



@Injectable({
    providedIn:"root"
})
export class SseService{

    constructor(private _zone:NgZone){}

    private getEventSource(url:string):EventSource{
        return new EventSource(url);
    }

    parseMessage=(event:Event)=>{
        const messageEvent = (event as MessageEvent);
        const data: MessageModel = JSON.parse(messageEvent.data);
        return (data.content && data.sender && data.timeSent)?data:undefined
    }

    getServerSentEvent(url:string): Observable<MessageModel> {
        var evs = this.getEventSource(url);

        return new Observable(observer => {
          evs.onmessage = event => {
            this._zone.run(() => {
                let value = this.parseMessage(event);
                if(value){observer.next(value);}
              });
          };
        });
      }

}