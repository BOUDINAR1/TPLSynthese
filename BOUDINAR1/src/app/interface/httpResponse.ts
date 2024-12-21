export interface ISecret{
    valid: boolean;
    owner: string;
    message: string;
}

export interface IVueMessage{
  
        userid: string,
        message: string,
        rating: number,
        date: {
          value: string
        },
        id: string
   
  }
  
 export interface IMessage {
    message: string,
    rating: number
      
 }

 export interface IUser {

    username: string,
    password: string
    email: string
    key: string

 }

 export interface IActiviteGET {
  
  userid: string,
  description: string,
  id: string,
  debut: {
    value: string
  },
  fin: {
    value: string
  }
  
  
 }

 export interface IFeedback{
  msg: string
 }

 export interface IActivitePUT{
  description : string,
  start : string,
  end : string
  }
