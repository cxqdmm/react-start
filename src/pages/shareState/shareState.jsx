import React from 'react';
import Panel from 'view/panel/panel';
import OrderManage from './component/orderManage';
import WaitForReceive from './component/waitForReceive';
export default function UseState(props) {
  return (
    <div className="use-state">
      <Panel breadcrumb={['hooks','共享状态']}>
        <div className="flex">
          <OrderManage className="flex-1" />
          <WaitForReceive className="flex-1" />
        </div>
      </Panel>
    </div>
  )
}