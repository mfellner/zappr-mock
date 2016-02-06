import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import zapprLogo from '../img/zappr.png'
import { requestGithubLogin, githubFetchToken } from '../actions/oauth'

function mapStateToProps(state) {
  return {
    user: state.users.user,
    oauth: state.oauth,
    webhook: state.webhook
  }
}

class Login extends Component {
  static propTypes = {
    oauth: PropTypes.object.isRequired,
    githubFetchToken: PropTypes.func.isRequired
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)
    const scope = 'user'
    const state = 'foo'
    this.github = {
      scope, state,
      url: `${WEBTASK_URL}?scope=${scope}&state=${state}`
    }
  }

  componentDidMount() {
    console.log('Login did mount %o', this.props.oauth)
    const {code, state} = this.props.oauth
    if (code && state) {
      console.log('waiting for Github OAuth handshake...')
      this.props.githubFetchToken(code, state)
    }
  }

  componentWillReceiveProps(props) {
    console.log('Login will receive props %o', props.oauth)
    if (props.oauth.isAuthenticated) {
      this.context.router.replace('/')
    }
  }

  render() {
    const style = {
      container: {
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      logo: {
        paddingBottom: '30px'
      }
    }
    const {isAuthenticating} = this.props.oauth
    return (
      <div style={style.container}>
        <div>
          <img alt="zappr" style={style.logo} src={zapprLogo}
               className="img-responsive"/>
          <a className="btn btn-md btn-social btn-github center-block"
             href={this.github.url} disabled={isAuthenticating}
             onClick={this.props.requestGithubLogin}>
            <span>
            {(() => (
              isAuthenticating
                ? (<i className="fa fa-spinner fa-pulse"/>)
                : (<i className="fa fa-github"/>)
            ))()}
            </span>
            Sign in with Github
          </a>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, {requestGithubLogin, githubFetchToken})(Login)
