import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import zapprLogo from '../img/zappr.png'
import { githubRequestLogin, githubFetchToken } from '../actions/oauth'

function mapStateToProps(state) {
  return {
    user: state.users.user,
    auth: state.oauth.github,
    webhook: state.webhook
  }
}

class Login extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    githubFetchToken: PropTypes.func.isRequired,
    loginUrl: PropTypes.string.isRequired
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  static defaultProps = {
    loginUrl: `${WEBTASK_URL}&login=github`
    + `&scope=${GITHUB_SCOPES.join(',')}`
    + `&state=${'github'}`
  };

  redirect(isAuthenticated) {
    if (isAuthenticated) {
      this.context.router.replace('/')
    }
  }

  componentDidMount() {
    console.log('Login did mount %o', this.props.auth)
    const {code, state} = this.props.auth
    if (code && state) {
      console.log('fetching Github access token...')
      this.props.githubFetchToken(code, state)
    }
    this.redirect(this.props.auth.isAuthenticated)
  }

  componentWillReceiveProps(props) {
    console.log('Login will receive props %o', props.auth)
    this.redirect(props.auth.isAuthenticated)
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
    const {isAuthenticating} = this.props.auth
    console.log('render Login %o', this.github)
    return (
      <div style={style.container}>
        <div>
          <img alt="zappr" style={style.logo} src={zapprLogo}
               className="img-responsive"/>
          <a className="btn btn-md btn-social btn-github center-block"
             href={this.props.loginUrl} disabled={isAuthenticating}
             onClick={this.props.githubRequestLogin}>
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

export default connect(mapStateToProps, {githubRequestLogin, githubFetchToken})(Login)
