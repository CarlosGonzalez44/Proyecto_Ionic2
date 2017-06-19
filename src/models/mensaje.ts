

export class Mensaje {
    
    id:number;
    author:string;
    content:string;
    date:Date;
    image:string;
    constructor(id,author,user_id,content,date) {

        this.id = id;
        this.content = content;
        this.date = date;
        this.author = author;
        this.setImage(user_id);
    }

    setImage(id){
        id = parseInt(id);
        if(id==1){
            this.image = '../../assets/imagenes/1p.png';
        }
        else if(id%2 == 0){
            this.image = '../../assets/imagenes/2p.jpg';
        }
        else{
            this.image = '../../assets/imagenes/3p.png';
        }
    }

    
}