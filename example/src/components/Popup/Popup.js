import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

export default class Popup extends Component {
  static propTypes = {
    full: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }
  static defaultProps = {
    maskClosable: true,
  }
  render() {
    const { ...restProps } = this.props;
    return(
      <Modal {...restProps} placement="bottom">
        {this.props.children}
      </Modal>
    );
  }
}