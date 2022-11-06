/**
 * title: 通用
 * desc: 最简单的用法。
 */
import { AutoComplete, Icon } from 'cat-ui';
import { Obj } from 'src/tools/type';

const App = () => {
  async function onSearch(wd: string) {
    let res: any = await jsonp({
      url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
      params: { wd },
      cbName: 'show',
    });
    res = res.s.map((value: string, index: number) => ({ value, index }));

    return res;
  }

  return (
    <AutoComplete onSearch={onSearch} style={{ width: 300 }} prefix={<Icon name="search" />} />
  );
};

export default App;

type JsonpType = {
  url: string;
  params: Obj;
  cbName: string;
};

function jsonp(option: JsonpType) {
  const { url, params, cbName } = option;
  return new Promise((resolve, reject) => {
    // @ts-ignore
    window[cbName] = function (data: any) {
      resolve(data);
      document.body.removeChild(script);
    };
    let list = [];
    for (let key in params) {
      list.push(`${key}=${params[key]}`);
    }
    let src = `${url}?${list.join('&')}&cb=${cbName}`;
    let script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
  });
}
