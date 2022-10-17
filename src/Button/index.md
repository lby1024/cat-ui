# Button

### 按钮类型

```tsx
/**
 * title: 按钮类型
 * desc: 按钮类型组要分为 'default' 'pramiry' 'danger' 'link'
 */
import React from 'react';
import { Button } from '../index';

export default () => (
  <div>
    <Button className="aaa" btnType="default">
      default
    </Button>
    <Button btnType="pramiry">pramiry</Button>
    <Button btnType="danger">danger</Button>
    <Button btnType="link" href="http://www.baidu.com">
      link
    </Button>
  </div>
);
```

### 按钮尺寸

```tsx
/**
 * title: 按钮尺寸
 * desc: 按钮尺寸组要分为 'lg' 'sm' 和默认大小
 */
import React from 'react';
import { Button } from '../index';

export default () => (
  <>
    <Button btnType="pramiry" size="lg">
      large
    </Button>
    <Button btnType="pramiry">default</Button>
    <Button btnType="pramiry" size="sm">
      small
    </Button>
  </>
);
```

### 按钮状态

```tsx
/**
 * title: 按钮状态
 * desc: disabled 状态
 */
import React from 'react';
import { Button } from '../index';

export default () => (
  <>
    <Button btnType="danger" disabled>
      bbb
    </Button>
    <Button btnType="link" href="http://www.baidu.com" disabled>
      bbb
    </Button>
  </>
);
```

<API src='./api.tsx'></API>
