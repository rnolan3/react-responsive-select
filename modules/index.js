import styles from './index.scss'
import classNames from 'classnames/bind'

import React, { Component, PropTypes } from 'react'
import Label from './Label'
import Menu from './Menu'

const cx = classNames.bind(styles)

export default class ResponsiveSelect extends Component {

  static propTypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    optionKeys: PropTypes.object,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string
  };

  static defaultProps = {
    classname: ''
  };

  state = {
    current: {
      value: this.props.defaultValue || null,
      label: null
    },
    focus: false
  };

  handleBlur = () => {
    document.removeEventListener('click', this.handleBlur)
    this.setState({ focus: false })
  };
  
  handleFocus = (e) => {
    e.stopPropagation()
    document.addEventListener('click', this.handleBlur, false)
    this.setState({ focus: true })
  };

  handleSelection = (option) => {
    const { onSelect } = this.props

    this.setState({
      current: option,
      focus: false
    })

    if (typeof onSelect === 'function') {
      onSelect(option.value)
    }
  };

  renderMenu () {
    const { optionKeys, options } = this.props
    const { current, focus } = this.state
    if (focus) {
      return (<Menu
        currentValue={ current.value }
        onClick={ this.handleSelection }
        optionKeys={ optionKeys }
        options={ options } />)
    }
  }

  render () {
    const { className, name, id, placeholder } = this.props
    const { current } = this.state
    const classes = cx(styles.responseSelect, className)

    return (
      <div className={ classes }>
        <input id={ id } name={ name } type="text" />
        <Label
          label={ current.label }
          onClick={ this.handleFocus }
          placeholder={ placeholder } />
        { this.renderMenu() }
      </div>
    )
  }

}
