import { Component, Fragment } from 'react'

export default class Unauthorized extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        {this.props.history.push("/")}
      </Fragment>
    )
  }
}
