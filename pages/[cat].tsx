import { GetStaticPaths, GetStaticProps } from "next";
import React, { ReactElement } from "react";
import { getAllCateogires, getCategory } from "service/cateogry";
import { getQuestionCountByCategory } from "service/question";

interface Props {
  category: any;
  count: number;
}

export default function Cateogry({ category, count }: Props): ReactElement {
  return (
    <div>
      {category.title}
      <h1>{count}</h1>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const cat = context.params!.cat as string;

  const category = await getCategory(cat);
  const count = await getQuestionCountByCategory(cat);

  return {
    props: {
      category: category[0] || {},
      count,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getAllCateogires();
  const paths = categories.map((category: any) => ({
    params: { cat: category.title.toLowerCase() },
  }));

  return {
    paths,
    fallback: false,
  };
};
