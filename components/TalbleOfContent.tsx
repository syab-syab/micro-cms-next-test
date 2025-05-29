type Props = {
  text: string
  id: string
}

// なんか知らんけど{ toc }: { toc: Array<Props> }じゃないとエラーが出る
// 分割代入?しないとapp/blog/[id]/page.tsxでエラーが出る
export const TableOfContents = ({ toc } : { toc: Array<Props> }) => {
  return (
    <div>
      <p className="TableOfContentsHead">目次</p>
      <ul>
        {toc.map(data => (
          <li key={data.id}>
            <a href={`#${data.id}`}>
              {data.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};