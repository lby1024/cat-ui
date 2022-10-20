/**
 * title: 基础
 * desc: 最简单的用法。
 */
import styled from 'styled-components';
import { AutoComplete, Icon } from '../index';
import { Obj } from '../tools/type';
import { AutoItemType } from './AutoComplete';

type Item = {
  value: string;
  index?: number;
};

const ListItem = styled.div`
  line-height: 2em;
  display: flex;
  justify-content: space-between;
`;

const App = () => {
  const renderItem = (item: AutoItemType<Item>) => (
    <ListItem>
      {item.value}
      <span>{item.index! + 1}</span>
    </ListItem>
  );

  return (
    <AutoComplete
      fetchSuggestions={fetchSuggestions}
      style={{ width: 300 }}
      // renderItem={renderItem}
      prefix={<Icon name="search" />}
    />
  );
};

export default App;

type JsonpType = {
  url: string;
  params: Obj;
  cbName: string;
};

async function fetchSuggestions(wd: string) {
  let res: any = await jsonp({
    url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
    params: { wd },
    cbName: 'show',
  });
  res = res.s.map((value: string, index: number) => ({ value, index }));

  return res;
}

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
