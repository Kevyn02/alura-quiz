import styled from 'styled-components';

const Input = styled.input`
  font-size: 14px;
  line-height: 24px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;

  background-color: ${({ theme }) => theme.colors.mainbg};
  color: #F9F9FF;

  height: 40px;
  width: 283px;
`;

export default Input;
