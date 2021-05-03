import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

const url = 'https://github.com/trending';

let url_list: string[] = [];
// let title_list: string[] = [];
const url_prefix = "https://github.com/"
const res = await fetch(url);
const html = await res.text();
const doc = new DOMParser().parseFromString(html, 'text/html');
const ref = doc?.querySelector('#js-pjax-container>.position-relative>.Box');


export const scrapingRepo = (): string[] => {
  const repositories = ref?.querySelectorAll('div>.Box-row>h1>a')
  if (repositories) {
    for(const repositoty of repositories) {
      url_list.push(url_prefix + repositoty.textContent.replace("\n\n", "").replace(/\s+/g, "").trim())
    }
  }
  return url_list
}

// 多分いらない
// export const scrapingTitle = (): string[] => {
//   const titles = ref?.querySelectorAll('div>.Box-row>p');
//   if (titles) {
//     for(const title of titles) {
//       title_list.push(title.textContent.trim().replace("\n", ""))
//     }
//   }
//   return title_list
// }