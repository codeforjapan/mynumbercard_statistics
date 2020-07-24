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
  &:hover,
  &:focus {
    text-decoration: none;
  }
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
  @media screen and (max-width: 600px) {
    a {
      display: none;
    }
    a.icon {
      float: right;
      display: block;
    }
  }
`
const MenuLi = styled.li`
  float: left;
  display: block;
  height: '100%';
  .icon {
    display: none;
  }
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
    a.icon {
      position: absolute;
      right: 0;
      top: 0;
    }
    a {
      float: none;
      display: none;
      text-align: left;
    }
  }
`
const ActiveStyles = {
  background: 'white',
  color: 'rebeccapurple',
  fontweight: 'bold'
}
interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <StyledHeader>
    <HeaderInner>
      <HomepageLink to="/">{title}</HomepageLink>
      <MenuNav>
        <MenuLi>
          <Link to="/data" activeStyle={ActiveStyles}>
            データ一覧
          </Link>
        </MenuLi>
        <MenuLi>
          <Link to="/about" activeStyle={ActiveStyles}>
            このサイトについて
          </Link>
        </MenuLi>
        <MenuLi>
          <GithubLink>
            <a href="https://github.com/codeforjapan/mynumbercard_statistics">
              <FontAwesomeIcon icon={faGithub} style={{ color: colors.white }} />
            </a>
          </GithubLink>
        </MenuLi>
        <MenuLi>
          <a href="javascript:void(0);" className="icon" onClick={() => console.log('click')}>
            <FontAwesomeIcon icon={faBars} style={{ color: colors.white }} />
          </a>
        </MenuLi>
      </MenuNav>
    </HeaderInner>
  </StyledHeader>
)

export default Header
