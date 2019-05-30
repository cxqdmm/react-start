import React from 'react';
import { Button, Input, Alert } from 'antd';
import Panel from 'view/panel/panel';
export default function UseState(props) {
  return (
    <div className="use-state">
      <Panel breadcrumb={['hooks','why hooks']}>
        <Alert
          message="说明"
          description="hooks-一种新的管理组件行为的方式使用Hook的动机减少状态逻辑复用的风险Hook和 Mixin在用法上有一定的相似之处，但是 Mixin引入的逻辑和状态是可以相互覆盖的，而多个 Hook之间互不影响，这让我们不需要在把一部分精力放在防止避免逻辑复用的冲突上。在不遵守约定的情况下使用 HOC也有可能带来一定冲突，比如 props覆盖等等，使用 Hook则可以避免这些问题。"
          type="info"
        />
        <span>mixin已被抛弃， HOC正当壮年， Hook初露锋芒</span>
      </Panel>
    </div>
  )
}