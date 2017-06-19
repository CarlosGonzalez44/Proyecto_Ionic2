

export class Sala {
    
    id:number;
    title:string;
    description:string;
    year:number;
    author:string;
    image:string;

    constructor(id,title,description,year,author) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.year = year;
        this.author = author;
        this.setImage();
    }

    setImage(){
        if(this.id==1){
            this.image = '../../assets/imagenes/1.jpg';
        }
        if(this.id==2){
            this.image = '../../assets/imagenes/2.jpg';
        }
        if(this.id==3){
            this.image = '../../assets/imagenes/3.jpg';
        }
        else{
            this.image = '../../assets/imagenes/4.jpg';
        }
    }

    
}