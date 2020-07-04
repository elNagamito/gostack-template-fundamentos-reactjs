import styled, { css } from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
  actual_url?: string;
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      a {
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        border: 5px black;
        transition: opacity 0.2s;

        & + a {
          margin-left: 32px;
        }

        &:hover {
          opacity: 0.6;
        }

        &:active {
          color: #a8a8b3;
        }

        ${props =>
          props.actual_url === '/' &&
          css`
            span#Importar {
              opacity: 0.8;
            }
            span#Listagem {
              display: inline-block;
              padding-top: 10px;
              padding-bottom: 10px;
              border-bottom: 2px solid #ff872c;
            }
          `}

        ${props =>
          props.actual_url === '/import' &&
          css`
            span#Listagem {
              opacity: 0.8;
            }
            span#Importar {
              display: inline-block;
              padding-top: 10px;
              padding-bottom: 10px;
              border-bottom: 2px solid #ff872c;
            }
          `}
      }
    }
  }
`;
