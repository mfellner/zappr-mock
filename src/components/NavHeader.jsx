import React from 'react'
import { Link } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap'

import icon from '../img/icon.png'

export default class NavHeader extends React.Component {
  static propTypes = {
    location: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  isActive(path) {
    if (this.props.location.pathname === path) {
      return 'active'
    } else {
      return null
    }
  }

  onLogout() {
    this.props.logout()
    this.context.router.replace('/login')
  }

  render() {
    const { login, html_url, avatar_url, isRequesting } = this.props.user

    const style = {
      brand: {
        padding: '0 15px'
      },
      logo: {
        marginTop: '1px',
        display: 'inline'
      },
      logoText: {
        fontFamily: 'minecraftmedium, sans-serif',
        fontSize: '2rem',
        marginBottom: 0,
        color: '#663931'
      },
      avatar: {
        width: '40px',
        marginTop: '5px'
      }
    }
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" style={style.brand}>
              <Image alt="ZAPPR"
                     src={icon}
                     style={style.logo}/>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text style={style.logoText}>
            ZAPPR
          </Navbar.Text>
          <Nav pullRight>
            <li className={this.isActive('/settings')}>
              <Link to="/settings">Settings</Link>
            </li>
            <NavDropdown title={login || 'anonymous'} id="basic-nav-dropdown">
              <MenuItem href={html_url}>
                Profile
              </MenuItem>
              <MenuItem divider/>
              <MenuItem onSelect={this.onLogout.bind(this)}>
                <i className="fa fa-sign-out"/>&nbsp;sign out
              </MenuItem>
            </NavDropdown>
            <li>
              {(() => (
                isRequesting
                  ? (<span className="navbar-text">
                      <i className="fa fa-lg fa-spinner fa-pulse"/>
                    </span>)
                  : (<Image alt="avatar"
                            className="hidden-xs"
                            style={style.avatar}
                            src={avatar_url}
                            circle/>)
              ))()}
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
