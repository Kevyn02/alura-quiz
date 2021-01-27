import styled from 'styled-components';

const Button = styled.button`
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
  border-radius: 4px;

  color: #FFFFFF;
  background-color: ${({ theme }) => theme.colors.secondary};

  font-size: 14px;
  line-height: 16px;

  text-align: center;
  letter-spacing: 1.25px;
  text-transform: uppercase;

  height: 36px;
  width: 283px;
`;

export default Button;
