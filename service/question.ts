import { fsp } from "./utils"

// 根据分类获取所有post
export async function getQuestionByCategory(category:string){
    try{
        const questions = await fsp.readdir('./posts/'+category);
        console.log(questions)
    }catch(err){
        console.error('获取题目失败，哦豁')
    }
}