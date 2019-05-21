
import React from 'react'
import './header.scss'
export default class Header extends React.Component {
  constructor(props) {
    super()
  }
  render() {
    return (
      <div className="header">
        {this.props.title}
      </div>
    )
  }
}