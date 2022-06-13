import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class DownloadFileService{
    constructor(private http:HttpClient){}

    public downloadFile(url:string,params:any):any{
        let newURL = url+params.fileName;
        return this.http.get(newURL, {responseType: 'blob'})
    }
}