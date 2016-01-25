import styles from './Label.scss'
import classNames from 'classnames/bind'

import React, { Component, PropTypes } from 'react'

const cx = classNames.bind(styles)

export default class Label extends Component {

  static propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  };

  static defaultProps = {
    label: null
  };

  render () {
    const { label, onClick, placeholder } = this.props
    const classes = cx(styles.label, {
      'placeholder': !label && placeholder
    })

    return (
      <div className={ classes } onClick={ onClick }>
        <label>{ label || placeholder }</label>
      </div>
    )
  }

}
