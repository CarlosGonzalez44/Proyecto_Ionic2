

export class Mensaje {
    
    id:number;
    author:string;
    content:string;
    date:Date;

    constructor(id,author,content,date) {

        this.id = id;
        this.content = content;
        this.date = date;
        this.author = author;
    }

    

    
}