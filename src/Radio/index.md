# Radio

### 基础

```tsx
/**
 * title: 基础
 * desc: 最简单的用法。
 */
import React from 'react';
import { Radio } from '../index';

export default () => <Radio.Item>Radio</Radio.Item>;
```

### 不可用

```tsx
/**
 * title: 不可用
 * desc: Radio 不可用。
 */
import React from 'react';
import { Radio } from '../index';

export default () => (
  <>
    <Radio.Item disabled={true} checked={true}>
      Disabled
    </Radio.Item>
    <Radio.Item disabled={true}>Disabled</Radio.Item>
  </>
);
```

### 单选组合

```tsx
/**
 * title: 单选组合
 * desc: 一组互斥的 Radio 配合使用。
 */

import React from 'react';
import { Radio } from '../index';

export default () => (
  <>
    <Radio.Group value="2">
      <Radio.Item value="1">A</Radio.Item>
      <Radio.Item value="2">B</Radio.Item>
      <Radio.Item value="3">C</Radio.Item>
    </Radio.Group>
  </>
);
```

### API

RadioItem

<API hideTitle src='./RadioItem.tsx'></API>

RadioGroup

<API hideTitle src='./RadioGroup.tsx'></API>
