
// we should maintain prices in number NOT in string 
export type Product = {
    id:string,
    title:string,
    price:number,
    description:string,
    category:string,
    image:string,
    rating:Rating
    
}

// JSON Data will always be a string

export type ProductRawData = {
    id:string,
    title:string,
    price:string,
    description:string,
    category:string,
    image:string,
    rating:{
        rate:string,
        count:string
    }
}

export type Rating = {
    rate:number,
    count:number
}
