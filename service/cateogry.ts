import { fsp } from "./utils"

// 获取所有分类
export async function getCategories(){
    try{
        const categories = await fsp.readdir('./posts/');
        categories.forEach((category)=>category.toLowerCase())
        return categories;
    } catch(err){
        console.error('读取posts文件夹错误')
    }
}

export async function getCategoryIndex(category:string){
    try{
        return fsp.readFile(`./posts/${category}/index.mdx`)
    }catch(err){
        console.error(`${category}目录下index.mdx文件缺失`)
    }
}

