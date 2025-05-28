import * as cheerio from 'cheerio';

type Props = {
  text: string;
  id: string;
}

export const renderToc = (body: string): Array<Props> => {
  const $ = cheerio.load(body);
  const headings = $('h1, h2, h3').toArray();
  const toc: Array<Props> = headings.map((data: any) => ({
    text: data.children[0].data,
    id: data.attribs.id
  }));

  return toc;
};