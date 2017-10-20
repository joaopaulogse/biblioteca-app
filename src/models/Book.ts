export class Book{

    title:string;
    authors:any[];
    description:string;
    categories:any[];
    pageCount:number;
    publisher:string;
    publishedDate:string;
    read:boolean;
    imageLinks:any;
    constructor(book){
        this.title = book.title;
        this.authors = book.authors;
        this.description = book.description;
        this.categories = book.categories;
        this.pageCount = book.pageCount;
        this.publisher = book.publisher;
        this.publishedDate = book.publishedDate;
        this.read = book.read;
        this.imageLinks = book.image;
    }
}