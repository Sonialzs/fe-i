import { GetStaticProps } from "next";
import React, { ReactElement } from "react";
import Link from "next/link";
import { getCategories } from "service/cateogry";

interface Props {
  categories: Array<string>;
}

export default function index({ categories }: Props): ReactElement {
  return (
    <ul>
      {categories.map((category) => (
        <Link href={`/${category}`} key={category}>
          <a>{category}</a>
        </Link>
      ))}
    </ul>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const categories = await getCategories();
  console.log(categories);

  return {
    props: {
      categories,
    },
  };
};
