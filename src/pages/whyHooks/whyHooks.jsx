import React from 'react';
import { Button, Input, Alert } from 'antd';
import Panel from 'view/panel';
export default function UseState(props) {
  return (
    <div className="use-state">
      <Panel breadcrumb={['hooks','why hooks']}>
        <Alert
          message="说明"
          description="useState "
          type="info"
        />
      </Panel>
    </div>
  )
}