import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import ListRow from '../../../component/ListRow/ListRow';
import SButton from '../../../component/Button/Button';
import Card from '../../../component/Card/Card';

const icon = require('./menu_ico2.png');

export default class LoanPage extends Component {
  static navigationOptions = () => ({
    title: 'list-row',
  });

  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <ScrollView>
        <ListRow title="2/411期" />
        <ListRow title="2/4期" value="420.0" splitLine={false} />
        <ListRow title="2/4期" value="420.0" icon={icon} />
        <ListRow
          title="2/4期"
          value="123"
          link
          onPress={() => {
            alert(123);
          }}
        />
        <ListRow title="2/4期" value={<SButton size="sm" shape="radius" type="primary" label="123" style={{ marginHorizontal: 0, marginVertical: 0 }} />} />
        <ListRow title="验证码" value={<SButton size="md" shape="radius" outline type="primary" outlineColor="#f00" label="获取验证码" style={{ marginHorizontal: 0, marginVertical: 0 }} />} />
        <ListRow title="手机号：" value={<SButton size="md" shape="radius" outline label="这里可以放input" style={{ marginHorizontal: 0, marginVertical: 0, flex: 1 }} />} />
        <ListRow title="2/4期" label="Lorem ipsum dolor, sit amet consectetur adipisicing elit." />
        <ListRow title="2/4期" value="420.0" label="Lorem ipsum dolor, sit amet consectetur adipisicing elit." />
        <ListRow title="2/3期" value="420.0" icon={icon} label="应支付日：2019年06月21日;应支付日：2019年06月21日" extra="已逾期" />

        <Card margin={15}>
          <ListRow title="2/1期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
          <ListRow title="2/2期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
          <ListRow title="2/3期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
        </Card>

        <Card padding={0} margin={15}>
          <ListRow title="2/1期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" contentOffset={15} />
          <ListRow title="2/2期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
          <ListRow title="2/3期" value="420.0" label="应支付日：2019年06月21日" extra="已逾期" />
        </Card>
      </ScrollView>
    );
  }
}
