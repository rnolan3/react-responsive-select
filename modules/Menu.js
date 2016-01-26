import styles from './Menu.scss'

import React, { Component, PropTypes } from 'react'
import Option from './Option'

export default class Menu extends Component {

  static propTypes = {
    currentValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    maxHeight: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    optionKeys: PropTypes.object,
    options: PropTypes.array.isRequired
  };

  static defaultProps = {
    optionKeys: { label: 'label', value: 'value' }
  };

  state = {
    hover: -1
  };

  componentWillMount () {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  _jumping = false;

  handleKeyDown = (e) => {
    const charCode = e.which

    if (charCode === 13) {
      this.selectOption()
    } else if (charCode === 40 || charCode === 38) {
      this.changeHoverState(e)
      e.preventDefault()
    } else {
      const { optionKeys, options } = this.props
      const optionsLength = options.length

      for (let i = 0; i < optionsLength; i++) {
        if (options[i][optionKeys.label][0] === String.fromCharCode(charCode)) {
          this.handleOptionHover(i)
          this.handleJumping()
          break
        }
      }
    }
  };

  handleJumping = () => {
    this._jumping = true
    setTimeout(() => this._jumping = false, 300)
  };

  handleOptionHover = (key) => {
    if (!this._jumping) {
      this.setState({ hover: key })
    }
  };

  selectOption = () => {
    this.props.onClick(this.props.options[this.state.hover])
  };

  changeHoverState = (e) => {
    const optionsLength = this.props.options.length - 1

    let direction = 0
    let hover = this.state.hover
    let nextHover

    switch (e.which) {
      case 40:
        direction++
        break
      case 38:
        direction--
        break
    }

    nextHover = hover + direction

    if (nextHover > optionsLength) {
      nextHover = 0
    } else if (nextHover === -1) {
      nextHover = optionsLength
    }

    this.setState({ hover: nextHover })
  };

  renderOptions (currentValue, options) {
    const { optionKeys } = this.props

    return options.map((o, k) => <Option
      hover={ k === this.state.hover }
      key={ k }
      label={ o[optionKeys.label] }
      oKey={ k }
      onClick={ this.props.onClick }
      onHover={ this.handleOptionHover }
      selected={ currentValue === o[optionKeys.value] }
      value={ o[optionKeys.value] } />)
  }

  render () {
    const { currentValue, options, maxHeight } = this.props
    return (
      <div className={ styles.menu } style={ { maxHeight: maxHeight } }>
        { this.renderOptions(currentValue, options) }
      </div>
    )
  }

}
