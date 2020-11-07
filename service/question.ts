import request from "umi-request";

export async function getQuestionsByCategory(cat:string){
    return request.get('http://localhost:1337/questions?category.title_containss='+cat)
}

export async function getQuestionCountByCategory(cat:string){
    return request.get('http://localhost:1337/questions/count?category.title_containss='+cat)
}

export async function getQuestionByCategoryWithLimit(cat:string, start = 0, limit = 10){
    return request.get(`http://localhost:1337/questions?_start=${start}&_limit=${limit}&category.title_containss=${cat}`);
}

export async function getQuestionsById(id:string){
    return request.get('http://localhost:1337/questions/'+id)
}

export async function getQuestionsByTitle(title:string){
    return request.get('http://localhost:1337/questions?title='+title)
}