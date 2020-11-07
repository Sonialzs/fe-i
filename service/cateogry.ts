import request, { extend } from "umi-request";

export async function getAllCateogires(){
    return request.get('http://localhost:1337/categories')
}

export async function getCategory(title:string){
    return request.get('http://localhost:1337/categories?title_containss='+title)
}
