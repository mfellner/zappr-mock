import React from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Image } from 'react-bootstrap'

import icon from '../img/icon.png'

export default class NavHeader extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired
  };
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  onLogout() {
    this.props.logout()
    this.context.router.replace('/login')
  }

  render() {
    const { login, html_url, avatar_url } = this.props.user

    const style = {
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
            <span style={{padding: '0 15px'}}>
              <Image alt="ZAPPR"
                     src={icon}
                     style={style.logo}/>
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Text style={style.logoText}>
            ZAPPR
          </Navbar.Text>
          <Nav pullRight>
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
              <Image alt="avatar"
                     className="hidden-xs"
                     style={style.avatar}
                     src={avatar_url}
                     circle/>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
