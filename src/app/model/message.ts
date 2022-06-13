export interface MessageModel{
    content:string;
    sender:string;
    timeSent:any;
    //content-type: TEXT, MEDIA, DOC
    contentType: string
}