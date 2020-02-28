import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Card, Button, ListRow } from '../components';

const icon = require('../icons/close.png');


export default class LoanPage extends Component {
  static navigationOptions = () => ({
    title: 'list-row',
  });

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <ListRow title="ttile" value="value" label="label" extra="extra" />
        <ListRow title="没有下划线" value="420.0" splitLine={false} activeOpacity={0} underlayColor="red" />
        <ListRow title="图标" value="420.0" icon={icon} />
        <ListRow title="图标可以是组件" value="420.0" icon={<Button size="sm" shape="radius" type="success">+</Button>} />
        <ListRow
          title="指示器"
          link
          onPress={() => {
            alert(123);
          }}
        />
        <ListRow title="可以是组件" value={<Button size="sm" shape="radius" type="error">1231</Button>} />
        <ListRow title="验证码" value={<Button size="md" shape="radius" outline type="primary" outlineColor="#f00">获取验证码</Button>} />
        <ListRow title="label 可以很长" label="Lorem ipsum dolor, sit amet consectetur adipisicing elit.Lorem ipsum dolor, sit amet consectetur adipisicing elit." />

        <Card margin={15}>
          <ListRow title="2/1期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
          <ListRow title="2/2期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
          <ListRow title="2/3期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
        </Card>

        <Card margin={15}>
          <ListRow title="2/1期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" containerStyle={{ paddingRight: 0 }} />
          <ListRow title="2/2期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
          <ListRow title="2/3期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
        </Card>
      </ScrollView>
    );
  }
}
