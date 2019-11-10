import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import { px } from '../../utils/ScreenUtil';

export default class LoanPage extends PureComponent {
  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    type: PropTypes.oneOf(['solid', 'dotted', 'dashed']),
    color: PropTypes.string,
    splitLineStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
  };

  static defaultProps = {
    color: '#F0F1F5',
    type: 'solid',
    width: '100%',
    splitLineStyle: {},
  };

  buildStyle() {
    const { width, color, type, splitLineStyle } = this.props;
    let splitLineStyleFinaly = [
      {
        width,
        marginRight: 'auto',
        marginLeft: 'auto',
        borderTopWidth: px(1),
        borderColor: color,
        borderStyle: type,
        opacity: 0.8,
      },
    ].concat(splitLineStyle);
    return splitLineStyleFinaly;
  }

  render() {
    return <View style={this.buildStyle()} />;
  }
}
