import React, { ReactElement } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { getAllCateogires, getCategory } from "service/cateogry";
import {
  getQuestionByCategoryWithLimit,
  getQuestionCountByCategory,
} from "service/question";

interface Props {
  category: any;
  count: number;
  questions: any;
}

export default function Page({
  category,
  count,
  questions,
}: Props): ReactElement {
  return (
    <div>
      <h1>{category.title}</h1>
      <h2>{count}</h2>
      <h3>
        {questions.map((question: any) => (
          <div>{question.title}</div>
        ))}
      </h3>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const cat = context.params!.cat as string;
  // ??? vscode推荐先转成unknown再转成number，不会报错
  const page = (context.params!.page as unknown) as number;

  const category = await getCategory(cat);
  const count = await getQuestionCountByCategory(cat);
  const questions = await getQuestionByCategoryWithLimit(cat, page);

  return {
    props: {
      category: category[0] || {},
      count,
      questions,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getAllCateogires();
  const paths = await Promise.all(
    categories.map(async (category: any) => {
      const cat = category.title.toLowerCase();
      const count = parseInt(await getQuestionCountByCategory(cat));

      // 向上取整得到总页数
      const totalPage = Math.ceil(count / 10);
      const result = [];
      for (let index = 0; index < totalPage; index++) {
        result.push({
          params: {
            cat,
            page: (index + 1).toString(),
          },
        });
      }
      return result;
    })
  );

  // @ts-ignore
  const flatPath = paths.flat();

  return {
    paths: flatPath,
    fallback: false,
  };
};
