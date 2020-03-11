import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

export default class ActionSheet extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }
  render() {
    const { visible, ...restProps } = this.props;
    return(
      <Modal visible={visible} {...restProps} placement="bottom">
        {this.props.children}
      </Modal>
    );
  }
}