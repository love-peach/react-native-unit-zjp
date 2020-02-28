import React, { Component }from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../../themes/Theme';

export default class Button extends Component {
  static propTypes = {
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }
  static defaultProps = {
    size: 'lg'
  }

  renderChild = () => {
    const { children, ...restProps } = this.props;
    if (children) {
      let childElements = [];
      
      const childrenLength = children.length;
      let currentStyle = {};

      childElements = React.Children.map(children, (item, index) => {
        if (index === 0) {
          currentStyle = styles.firstButtonStyle;
        } else if (index === childrenLength - 1){
          currentStyle = styles.lastButtonStyle;
        } else {
          currentStyle = styles.ButtonStyle;
        }
        return React.cloneElement(item, { ...restProps, shape: 'rect', style: { ...currentStyle } });
      });

      return childElements;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderChild()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  firstButtonStyle: {
    borderTopLeftRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  ButtonStyle: {
    borderRadius: 0,
  },
  lastButtonStyle: {
    borderTopRightRadius: 1000,
    borderBottomRightRadius: 1000,
  },
});

