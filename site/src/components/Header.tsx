import * as React from 'react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import { Link } from 'gatsby'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Container from './Container'
import { heights, dimensions, colors } from '../styles/variables'

type LinkType = {
  page: string
  text: string
}
export const MenuLInks: LinkType[] = [
  {
    page: '/data',
    text: 'データ一覧'
  },
  {
    page: '/chant',
    text: 'データ供養の方法'
  },
  {
    page: '/about',
    text: 'このサイトについて'
  }
]

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
  height: `${MenuLInks.length * 54 + 40}px`
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
    position: relative;
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
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [isOpen, setOpen] = React.useState(false)
  const toggleOpen = React.useCallback(() => setOpen(prevState => !prevState), [])
  return (
    <StyledHeader>
      <HeaderInner>
        <HomepageLink to="/">{title}</HomepageLink>
        <MenuNav style={isOpen ? openmenu : undefined}>
          {MenuLInks.map(({ page, text }) => (
            <MenuLi style={isOpen ? openli : undefined} key={page}>
              <Link to={page} activeStyle={ActiveStyles}>
                {text}
              </Link>
            </MenuLi>
          ))}
          <MenuLi style={isOpen ? openli : undefined}>
            <GithubLink>
              <a href="https://github.com/codeforjapan/mynumbercard_statistics">
                <FontAwesomeIcon icon={faGithub} style={{ color: colors.white }} />
              </a>
            </GithubLink>
          </MenuLi>
        </MenuNav>
        <BargerBtn className="icon" onClick={toggleOpen}>
          <FontAwesomeIcon icon={faBars} style={{ color: colors.white }} />
        </BargerBtn>
      </HeaderInner>
    </StyledHeader>
  )
}
export default Header
