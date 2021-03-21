import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const Nav = styled.nav`;
  background: #ffffff;
  height: 200px;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top:0
  z-index: 10;
`;

export const NavbarContainer = styled.div`
  color: #8d6f1a;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  text-decoration: none;
  min-width: 100%;
  position: sticky;
  top: 0;
`;

export const NavLogo = styled(LinkR)`
  margin-left: 400px;
  justify-self: start;
  cursor: pointer;
`;

export const NavMenu = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-gap: 2px;
  list-style: none;
  text-align: center;
  font-size: 1.5rem;
  justify-content: start;
  margin-left: -600px;
  color: #8d6f1a;
`;
export const NavMenuLeft = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 2px;
  list-style: none;
  justify-content: end;
  font-size: 1.5rem;
  padding-left: 40rem;
  color: #8d6f1a;
  margin-right: 0;
`;

export const NavItem = styled.li`
  height: -5px;
`;

export const NavLinks = styled(LinkS)`
  color: #8d6f1a;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #d3a625;
  }
`;
