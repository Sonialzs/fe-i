import fm from "front-matter";
import fs from 'fs'

// 获取所有分类
export function getCategories(){
    const categories = fs.readdirSync('./content/');
    categories.forEach((category)=>category.toLowerCase())
    return categories;
}

export function getCategoryIndex(category:string){
    try{
        const file =fs.readFileSync(`./content/${category}/index.mdx`, 'utf8');
        const fr = fm(file);
        return fr;
    }catch(err){
        console.error(`${category}目录下index.mdx文件缺失`)
    }
}

