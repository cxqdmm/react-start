import React from 'react';
import { Statistic, Row, Col, Icon, Card, Descriptions} from 'antd';
import { connect } from 'redux';
import '../less/index.module.less'
import filmModule from '../module/film';
import shopModule from '../module/shop';

function collectionPanel (props){
  
  return (
    <div styleName="box" className={props.className}>
      <div styleName="head">费用汇总</div>
      <div>
      <Row gutter={16}>
        <Col span={12} style={{padding:30}}>
          <Card>
            <Statistic
              title="费用"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600', width: 200}}
              prefix={<Icon type="arrow-up" />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12} >
        <Descriptions title="User Info" bordered>
          <Descriptions.Item label="shop">{shopModule.list.length}</Descriptions.Item>
          <Descriptions.Item label="film">{filmModule.list.length}</Descriptions.Item>
        </Descriptions>
        </Col>
      </Row>
      </div>
    </div>
  )
}
export default connect([filmModule, shopModule])(collectionPanel)