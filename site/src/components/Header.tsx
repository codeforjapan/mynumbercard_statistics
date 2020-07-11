import * as React from 'react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import { Link } from 'gatsby'

import { heights, dimensions, colors } from '../styles/variables'
import Container from './Container'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

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
`
const GithubLink = styled(Container)`
  color: ${colors.white};
  font-size: 1.5rem;
  font-weight: 600;
  margin-right: 20px;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <StyledHeader>
    <HeaderInner>
      <HomepageLink to="/">{title}</HomepageLink>
      <GithubLink>
        <a href="https://github.com/codeforjapan/mynumbercard_statistics">
          <FontAwesomeIcon icon={faGithub} style={{ color: colors.white }} />
        </a>
      </GithubLink>
    </HeaderInner>
  </StyledHeader>
)

export default Header
