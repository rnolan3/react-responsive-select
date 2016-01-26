import styles from './option.scss'
import classNames from 'classnames/bind'

import React, { Component, PropTypes } from 'react'

const cx = classNames.bind(styles)

export default class Option extends Component {

  static propTypes = {
    hover: PropTypes.bool,
    label: PropTypes.string.isRequired,
    oKey: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    onHover: PropTypes.func,
    selected: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  };

  static defaultProps = {
    selected: false
  };

  shouldComponentUpdate (nextProps) {
    const { hover, selected } = this.props

    if (nextProps.hover) {
      this.refs.a.scrollIntoViewIfNeeded()
    }

    return (selected !== nextProps.selected ||
      hover !== nextProps.hover)
  }

  handleClick = (e) => {
    e.stopPropagation()

    const { onClick, label, value } = this.props
    onClick({ value, label })
  };

  handleHover = () => {
    const { onHover, oKey } = this.props

    if (typeof onHover === 'function') {
      onHover(oKey)
    }
  };

  render () {
    const { label, selected, hover } = this.props
    const classes = cx(styles.option, {
      'selected': selected,
      'hover': hover
    })

    return (
      <a className={ classes }
        onClick={ this.handleClick }
        onMouseOver={ this.handleHover }
        ref="a">
        { label }
      </a>
    )
  }

}
