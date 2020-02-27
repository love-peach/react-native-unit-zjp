import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Card, Button, ListRow } from '../components';

const icon = require('../../images/close_gray.png');

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
        <ListRow title="2/411期" style={{ margin: 10 }} onPress={() => {
          alert(123);
        }} />
        <ListRow title="2/4期" value="420.0" splitLine={false} activeOpacity={0} underlayColor="red" />
        <ListRow title="2/4期" value="420.0" icon={icon} />
        <ListRow
          title="2/4期"
          value="123"
          link
          onPress={() => {
            alert(123);
          }}
        />
        <ListRow title="2/4期" value={<Button size="sm" shape="radius" type="primary" label="123" style={{ marginHorizontal: 0, marginVertical: 0 }} />} />
        <ListRow title="验证码" value={<Button size="md" shape="radius" outline type="primary" outlineColor="#f00" label="获取验证码" style={{ marginHorizontal: 0, marginVertical: 0 }} />} />
        <ListRow title="手机号：" value={<Button size="md" shape="radius" outline label="这里可以放input" style={{ marginHorizontal: 0, marginVertical: 0, flex: 1 }} />} />
        <ListRow title="2/4期" label="Lorem ipsum dolor, sit amet consectetur adipisicing elit." />
        <ListRow title="2/4期" value="420.0" label="Lorem ipsum dolor, sit amet consectetur adipisicing elit." />
        <ListRow title="2/3期" value="420.0" icon={icon} containerWrapStyle={{ paddingLeft: 20 }} containerStyle={{ paddingRight: 10, paddingLeft: 30 }} label="应支付日：2019年06月21日;应支付日：2019年06月21日" extra="已逾期" />

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
