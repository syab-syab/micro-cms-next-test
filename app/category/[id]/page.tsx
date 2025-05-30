import Link from "next/link";
// import { client } from "../../libs/client";
import { client } from "@/libs/microcms";

// ↓見ながら修正する
// https://github.com/syab-syab/micro-cms/blob/main/app/tags/%5BtagId%5D/page.tsx

type Props = {
  id: string
  title: string
}
// type Props = {
//   id: string
//   title: string
//   body: string
//   publishedAt: string
//   category: { name: string }
//   toc_visible: boolean
// };

async function getCategoryBelongBlog(id: string): Promise<Props[]> {
  const data = await client.get({
      endpoint: "blog",
      queries: {
        fields: 'id,title',
        filters: `category[equals]${id}`
      }
    })

  return data.contents;
};

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const posts = await getCategoryBelongBlog(id)
  console.log(posts)

  // return (
  //   <div>
  //     <h1>{id}</h1>
  //   </div>
  // )
  // カテゴリーに紐付いたコンテンツがない場合に表示
  if (posts.length === 0) {
    return <div>記事がありません</div>;
  }
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 静的生成のためのパスを指定
// page routerを扱ってる記事の関数だから正しいかどうかわからん
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });

  const paths = data.contents.map((content: any) => `/category/${content.id}`);
  return { paths, fallback: false };
};
