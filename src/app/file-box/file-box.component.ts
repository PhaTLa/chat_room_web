import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import * as FileSaver from 'file-saver';
import { CommonConstant } from '../constants/commonConstant';
import { DownloadFileService } from '../services/downloadService';


@Component({
  selector: 'app-file-box',
  templateUrl: './file-box.component.html',
  styleUrls: ['./file-box.component.css']
})
export class FileBoxComponent implements OnInit,AfterContentInit {

  @Input() fileInfo!:string;
  fileName:string = '';
  fileSize:string = '';
  displayText:string = '';
  downloadIcon = faDownload;
  constructor(private downloadService:DownloadFileService) { }

  ngAfterContentInit(): void {
    let fileData:string[] = this.fileInfo.split('-');
    if(fileData.length === 2){
      this.fileName = fileData[0];
      let size:number = <number><unknown>fileData[1];
      this.fileSize = +(size/1000).toFixed(2) + ' MB';

      this.displayText = this.fileName + "  " + this.fileSize;
    }
  }

  ngOnInit(): void {
  }

  downloadFile(){
    console.log(this.fileName);
    let param = {
      fileName :this.fileName,
      responseType:'blob'
    }
    this.downloadService.downloadFile(CommonConstant.URL_DOWNLOAD,param).subscribe((data:any) =>{
      console.log(data);
      
      let blob:any = new Blob([data]);
			// const url = window.URL.createObjectURL(blob);
      FileSaver.saveAs(blob, this.fileName);
    })
  }

}
