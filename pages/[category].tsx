import { GetStaticProps } from "next";
import React, { ReactElement } from "react";
import { getCategories, getCategoryIndex } from "service/cateogry";
import { getQuestionByCategory } from "service/question";

interface Props {}

export default function Category({}: Props): ReactElement {
  return <div></div>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const category = context.params!.category as string;
  const file = await getCategoryIndex(category);
  console.log(file);

  return {
    props: {},
  };
};

export async function getStaticPaths() {
  const categories = await getCategories();
  const paths = categories?.map((category) => ({ params: { category } }));
  return {
    paths: paths,
    fallback: false,
  };
}
