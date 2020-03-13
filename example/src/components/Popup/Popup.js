import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';
import Theme from '../../themes/Theme';

export default class Popup extends Component {
  static propTypes = {

    visible: PropTypes.bool,
    maskClosable: PropTypes.bool,
    onMaskPress: PropTypes.func,

    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
  }
  static defaultProps = {
    header: false,
    maskClosable: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.visible,
    };
  }

  componentDidMount() {
    this.setState({
      isVisible: this.props.visible,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.visible === this.props.visible && nextProps.visible === this.state.isVisible) {
      return;
    }
    if (nextProps.visible) {
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    this.setState({
      isVisible: true,
    });
  }

  hide() {
    this.setState({
      isVisible: false,
    });
  }

  render() {
    const { children, ...restProps } = this.props;
    return(
      <Modal visible={this.state.isVisible} {...restProps} placement="bottom" contentStyle={{ padding: 0, backgroundColor: Theme.grayLight }}>
        {this.props.children}
      </Modal>
    );
  }
}