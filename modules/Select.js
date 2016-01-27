import styles from './Select.scss'
import classNames from 'classnames/bind'
import findOptionByValue from './utils/findOptionByValue'

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
    menuPadding: PropTypes.number,
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    optionKeys: PropTypes.object,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string
  };

  static defaultProps = {
    classname: '',
    menuPadding: 25
  };

  state = {
    current: findOptionByValue(
      this.props.defaultValue,
      this.props.options,
      this.props.optionKeys) || null,
    focus: false
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.defaultValue !== this.props.defaultValue) {
      this.setState({
        current: findOptionByValue(
          this.props.defaultValue,
          this.props.options,
          this.props.optionKeys)
      })
    }
  }

  handleBlur = () => {
    document.removeEventListener('click', this.handleBlur)
    this.setState({ focus: false })
  };

  handleFocus = (e) => {
    e.stopPropagation()
    document.addEventListener('click', this.handleBlur, false)
    const { menuWrapper } = this.refs
    const wrapperMetrics = menuWrapper.getBoundingClientRect()

    this._menuMaxHeight = window.innerHeight - wrapperMetrics.top - this.props.menuPadding
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
        maxHeight={ this._menuMaxHeight }
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
        <input value={ current.value }
          id={ id }
          name={ name }
          type="text"
          readOnly />
        <Label
          label={ current.label }
          onClick={ this.handleFocus }
          placeholder={ placeholder } />
        <div ref="menuWrapper">
          { this.renderMenu() }
        </div>
      </div>
    )
  }

}
