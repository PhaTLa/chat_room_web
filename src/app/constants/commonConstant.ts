import { Injectable } from "@angular/core";


@Injectable({
    providedIn:"root"
})
export class CommonConstant{

    public static MESSAGE_TYPE_TEXT:string = 'TEXT';
    public static MESSAGE_TYPE_MEDIA:string = 'MEDIA';
    public static MESSAGE_TYPE_DOC:string = 'DOC';
    public static URL_DOWNLOAD:string = 'http://10.2.216.108:8081/test/download?fileName='

    constructor(){}
}