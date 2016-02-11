import React, { Component, PropTypes } from 'react'
import { Input } from 'react-bootstrap'

import 'bootstrap-toggle/css/bootstrap2-toggle.css'

/**
 * Based on http://www.bootstraptoggle.com
 */
export default class Toggle extends Component {
  static propTypes = {
    checked: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    isUpdating: PropTypes.bool.isRequired,
    labelOn: PropTypes.string.isRequired,
    labelOff: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    className: PropTypes.string
  };
  static defaultProps = {
    checked: false,
    isUpdating: false,
    labelOn: 'On',
    labelOff: 'Off',
    size: '',
    width: '58px',
    height: '34px',
    className: ''
  };

  onToggle(event) {
    event.preventDefault()
    if (!this.props.isUpdating) {
      this.props.onToggle(!this.props.checked)
    }
  }

  render() {
    const {checked, isUpdating, labelOn, labelOff} = this.props
    const {size, width, height, className} = this.props
    const off = checked ? 'primary' : 'default off'
    const disabled = isUpdating ? 'disabled' : ''
    const spinner = isUpdating
      ? (<span><i className="fa fa-refresh fa-spin"/>&nbsp;</span>)
      : null
    const btnSize = this.props.size ? `btn-${this.props.size}` : ''

    return (
      <div className={`toggle btn btn-${off} ${disabled} ${className}`.trim()}
           style={{width, height}}
           onClick={this.onToggle.bind(this)}>
        <Input type="checkbox" checked={checked} disabled={!!disabled} readOnly/>
        <div className="toggle-group">
          <label className={`btn btn-primary toggle-on ${btnSize}`}>{spinner || labelOn}</label>
          <label className={`btn btn-default active toggle-off ${btnSize}`}>{spinner || labelOff}</label>
          <span className={`toggle-handle btn btn-default ${btnSize}`}/>
        </div>
      </div>
    )
  }
}
