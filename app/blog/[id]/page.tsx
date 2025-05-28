// app/blog/[id]/page.tsx
import { client } from '../../../libs/microcms';
import styles from './page.module.css';
import dayjs from 'dayjs';
import { renderToc } from '@/libs/render-toc';
import { TableOfContents } from '@/components/TalbleOfContent';

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  category: { name: string };
};

// microCMSから特定の記事を取得
async function getBlogPost(id: string): Promise<Props> {
  const data = await client.get({
    endpoint: `blog/${id}`,
  });
  return data;
}

// 記事詳細ページの生成
export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // IDを取得
  const post = await getBlogPost(id);

  // dayjsを使ってpublishedAtをYY.MM.DD形式に変換
  const formattedDate = dayjs(post.publishedAt).format('YY.MM.DD');

  // リンク付きの目次作成
  const toc = renderToc(post.body);
  console.log(toc);
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{post.title}</h1> {/* タイトルを表示 */}
      <div className={styles.date}>{formattedDate}</div> {/* 日付を表示 */}
      <div className={styles.category}>カテゴリー：{post.category && post.category.name}</div> {/* カテゴリーを表示 */}
      <TableOfContents toc={toc} />
      <div className={styles.post} dangerouslySetInnerHTML={{ __html: post.body }} /> {/* 記事本文を表示 */}
    </main>
  );
}

// 静的パスを生成
export async function generateStaticParams() {
  const contentIds = await client.getAllContentIds({ endpoint: 'blog' });

  return contentIds.map((contentId) => ({
    id: contentId, // 各記事のIDをパラメータとして返す
  }));
}