import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const location = useLocation();
  return (
    <Container size={size} actual_url={location.pathname}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <Link key="Listagem" to="/">
            <span id="Listagem">Listagem</span>
          </Link>
          <Link key="Importar" to="/import">
            <span id="Importar">Importar</span>
          </Link>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
