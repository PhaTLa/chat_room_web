import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, AfterViewChecked, Component, OnInit,NgZone } from '@angular/core';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { CommonConstant } from './constants/commonConstant';
import { MessageModel } from './model/message';
import { SseService } from './services/sseService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  paperclip = faPaperclip;
  credential:string;
  messageDetail:MessageModel;
  isRegisted:boolean;
  listMessage:MessageModel[];
  datePipe:DatePipe;
  messageContent:string = '';
  postUrl:string = 'http://10.2.216.108:8081/test/sent_message';
  postUrlFile:string = "http://10.2.216.108:8081/test/upload-file"
  eventSourceUrl:string = 'http://10.2.216.108:8081/test/chat_stream';
  receivedMess:MessageModel;
  isModalOpen:boolean = false;
  imgLinkModal:string;

  constructor(private http:HttpClient, 
              private sseService:SseService){
    this.credential = '';
    this.messageDetail  = {
      content:'',
      sender:'',
      timeSent: null,
      contentType:''
    }
    this.receivedMess={
      content:'',
      sender:'',
      timeSent: null,
      contentType:''
    }
    this.isRegisted = false;
    this.listMessage=[];
    this.datePipe = new DatePipe('en_US');
    this.imgLinkModal = '';
  }
  
  

  ngOnInit(): void {
    this.sseService.getServerSentEvent(this.eventSourceUrl).subscribe(data=>{
      this.printMessage(data);
    });
  }

  onclickBtRegistry(){
    console.log(this.credential);
    this.messageDetail.sender = this.credential;
    this.isRegisted = true;
    var newMess : MessageModel = {
      content:'welcome to the chat : '+this.credential,
      sender:'Admin',
      timeSent: this.datePipe.transform(new Date(),'dd/MM/yyyy HH:mm:ss'),
      contentType:CommonConstant.MESSAGE_TYPE_TEXT
    };
    this.listMessage.push(newMess);
  }

  sendMessageEnter($event:any){
    if($event.code === 'Enter'){
      console.log(this.messageContent, this.credential);
      
      this.messageDetail.content = this.messageContent;
      this.messageDetail.sender = this.credential;
      this.messageDetail.timeSent = this.datePipe.transform(new Date(),'dd/MM/yyyy HH:mm:ss');
      this.messageDetail.contentType = CommonConstant.MESSAGE_TYPE_TEXT;

      this.sent(this.messageDetail).subscribe(data => {
        if(_.isEqual(data, this.messageDetail)){
          this.receivedMess = data;
          this.listMessage.push(this.receivedMess);
          console.log(data);
          console.log("sent success!");
        }
      });
      this.messageContent = '';
    }
  }

  sent(params: MessageModel): Observable<MessageModel> {
    return this.http.post<MessageModel>(this.postUrl, params);
  }

  sentFile(params:any):Observable<MessageModel> {
    return this.http.post<MessageModel>(this.postUrlFile, params);
  }


  printMessage(message: MessageModel){
    if(_.isEqual(message,this.receivedMess) === false){
      this.listMessage.push(message);
      this.receivedMess = message;
    }
  }

  onClickBtnUpload(){
    document.getElementById('btnUpload')?.click();
  }

  handleFileUpload($event:any){
    let file:File = $event.target.files[0];
    console.log(file);

    const formData = new FormData();
    formData.append("file",file);
    formData.append("sender",this.credential)

    this.sentFile(formData).subscribe(data=>this.printMessage(data))
  }

  openModal(link:string){
    this.imgLinkModal = link;
    this.isModalOpen=true;
  }

  handleModalClose($event:any){
    this.isModalOpen = !($event);
  }
}
