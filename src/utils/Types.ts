export interface BreadCrumbsTypes{
    text:string;
    href?:string;
    onClick?:()=> void;
}
export interface UserType{
    email:string;
    name:string;
    uid:string;
    label?:string;
}

export type MeetinJoinType ="anyone-can-join"|"vide-conference"|"1-on-1";

export interface MeetingType{
    docId?:string;
    createBy:string;
    invitedUsers:Array<string>;
    maxUsers:number;
    meetingDate:string;
    meetingId:string;
    meetingName:string;
    meetingType:MeetinJoinType;
    status:boolean;
}

export interface FieldErrorType{
    show:boolean;
    message:Array<string>;
    
}

export interface ToastType{
  id:string;
  title:string;
  color:"success"|"primary"|"warning"  |"danger"|undefined;
}
