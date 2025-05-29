// app/page.tsx
import Link from 'next/link';
import { client } from '../libs/microcms';

// ブログ記事の型定義
type Props = {
  id: string
  title: string
};

// microCMSからブログ記事を取得
async function getBlogPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: 'blog', // 'blog'はmicroCMSのエンドポイント名
    queries: {
      fields: 'id,title',  // idとtitleを取得
      limit: 5,  // 最新の5件を取得
    },
  });
  return data.contents;
}

type CategoryProps = {
  id: string
  name: string
}

async function getCategories(): Promise<CategoryProps[]> {
  const data = await client.get({
    endpoint: 'categories',
    queries: {
      fields: 'id,name',
      // limit: 5,
    },
  })
  return data.contents;
}

export default async function Home() {
  const posts = await getBlogPosts();
  console.log(posts)

  const categories = await getCategories();
  console.log(categories)

  return (
    <main>
      <h1>ブログ記事一覧</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}> {/* 記事へのリンクを生成 */}
              {post.title} {/* タイトルを表示 */}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
      <h1>カテゴリ一覧</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}