import * as React from 'react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import { Link } from 'gatsby'

import { heights, dimensions, colors } from '../styles/variables'
import Container from './Container'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const StyledHeader = styled.header`
  height: ${heights.header}px;
  padding: 0 ${dimensions.containerPadding}rem;
  background-color: ${colors.brand};
  color: ${transparentize(0.5, colors.white)};
`

const HeaderInner = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`

const HomepageLink = styled(Link)`
  color: ${colors.white};
  font-size: 1.5rem;
  font-weight: 600;
  margin-right: auto;
  @media screen and (max-width: 600px) {
    margin-right: 40px;
  }
`
const GithubLink = styled(Container)`
  color: ${colors.white};
  font-size: 1.5rem;
  font-weight: 600;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`
const MenuNav = styled.nav`
  height: 100%;
  z-index: 10;
  @media screen and (max-width: 600px) {
    display: none;
  }
`
const openmenu: React.CSSProperties = {
  display: 'block',
  background: colors.brand,
  position: 'absolute',
  top: '60px',
  right: '-1.5rem',
  height: '150px'
}
const openli: React.CSSProperties = {
  float: 'none'
}

const MenuLi = styled.li`
  float: left;
  display: block;
  height: '100%';
  a {
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 8px 10px;
    text-decoration: none;
    font-size: 17px;
    margin-top: 8px;
  }
  a: hover {
    background-color: #ddd;
    color: black;
  }
  @media screen and (max-width: 600px) {
     {
      position: relative;
    }
  }
`
const BargerBtn = styled.button`
  display: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  margin-top: 16px;
  @media screen and (max-width: 600px) {
    display: block;
    position: absolute;
    float: right;
    right: 0;
    top: 0;
  }
`
const ActiveStyles = {
  background: 'white',
  color: 'rebeccapurple',
  fontweight: 'bold'
}
interface HeaderProps {
  title: string
  isopen: boolean
  count: number
}

class Header extends React.Component<any, HeaderProps> {
  constructor(args: any) {
    super(args)
    this.state = { title: args.title, isopen: false, count: 0 }
  }
  render() {
    return (
      <StyledHeader>
        <HeaderInner>
          <HomepageLink to="/">{this.state.title}</HomepageLink>
          <MenuNav style={this.state.isopen ? openmenu : undefined}>
            <MenuLi style={this.state.isopen ? openli : undefined}>
              <Link to="/data" activeStyle={ActiveStyles}>
                データ一覧
              </Link>
            </MenuLi>
            <MenuLi style={this.state.isopen ? openli : undefined}>
              <Link to="/about" activeStyle={ActiveStyles}>
                このサイトについて
              </Link>
            </MenuLi>
            <MenuLi style={this.state.isopen ? openli : undefined}>
              <GithubLink>
                <a href="https://github.com/codeforjapan/mynumbercard_statistics">
                  <FontAwesomeIcon icon={faGithub} style={{ color: colors.white }} />
                </a>
              </GithubLink>
            </MenuLi>
          </MenuNav>
          <BargerBtn className="icon" onClick={() => this.setState({ isopen: !this.state.isopen })}>
            <FontAwesomeIcon icon={faBars} style={{ color: colors.white }} />
          </BargerBtn>
        </HeaderInner>
      </StyledHeader>
    )
  }
}

export default Header
