import { GetStaticProps } from "next";
import React, { ReactElement } from "react";
import Link from "next/link";
import { getAllCateogires } from "service/cateogry";

interface Props {
  categories: Array<any>;
}

export default function index({ categories }: Props): ReactElement {
  return (
    <ul>
      {categories.map((category) => (
        <Link href={`/${category.title.toLowerCase()}`} key={category.title}>
          <a>{category.title}</a>
        </Link>
      ))}
    </ul>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const categories = await getAllCateogires();
  console.log(categories);
  return {
    props: {
      categories,
    },
  };
};
