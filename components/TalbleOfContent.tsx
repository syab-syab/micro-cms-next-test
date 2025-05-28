type Props = {
  text: string;
  id: string;
}

// なぜ{ toc }: {toc: Array<Props>}でエラーが直ったのかよくわからんので後で調べる
export const TableOfContents = ({ toc }: {toc: Array<Props>}) => {
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