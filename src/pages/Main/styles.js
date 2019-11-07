import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  padding: 0 15px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }

  @media (max-width: 321px) {
    padding: 0 0px;
  }

`;

export const Logo = styled.div`

    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;


    div {
    width: 50%;
    margin: auto;
  }

  img {
    display: block;
    width: 100%;
    max-width: 500px;
    height: auto;
    margin: auto;
  }
`

const rotate = keyframes`
 from{
   transform: rotate(0deg);
 }
 to {
   transform: rotate(360deg);
 }
`;

export const SubmitButton = styled.i.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #ed1d24;
  font-size: 28px;
  border: 0;
  padding: 0 15px;
  border-radius: 4px;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
  svg {
        color: #333;
        fill: #fff;
      }
  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
        color: #333;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;
  li {
    display: flex;
    padding: 15px 15px;
    flex-direction: row;
    align-items: center;
    border: solid 2px rgb(238, 238, 238);
    border-image: initial;
    border-radius: 4px;
    text-decoration: none;
    transition: all 180ms ease-in-out 0s;
    margin-bottom: 10px;



    h3{
      margin-top: 10px;
    }

    &:hover{
      border-color: #ddd;
        transform: scale(1.005);
        box-shadow: 0 12px 10px -10px hsla(254, 26%, 25%, 0.27);
    }
    img{
      width: 100px;
      border-radius: 50%;
      height: 100px;
      border: 2px solid #eaeaea;
    }

    @media (max-width: 320px){
      img{
      width: 50px;
      height: 50px;
      }
    }

    span {
      font-size: 12px;
      font-weight: 500;
    }

    h2 {
      margin-bottom: 5px;
    }
  }
  a {
    color: #333333;
    text-decoration: none;
    display: flex;

    &:hover{
      div{
        h2{
          color: #ed1d24;
        }
      }
    }

    div{
      display: flex;
      flex: 1 1 0%;
      flex-direction: column;
      margin: 0px 20px;
      padding: 7px 0px;
    }

    @media (max-width: 320){
        min-height: 200px;
      }
  }



`;

export const Container = styled.div`
  max-width: 900px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;
  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    svg {
      margin-right: 10px;
    }
    a{
      text-decoration: none;
      color: #e2001a;
      font-weight: 700;
    }
  }
`;

export const PageNav = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0 0;
  margin-top: auto;
  button {
    border-radius: 3px;
    border: 0;
    padding: 12px 20px;
    margin: 0;
    &:hover {
      background: #e2001a;
      color: #fff;
    }
    &[disabled] {
      background: rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.3);
      cursor: auto;
    }
    svg {
      vertical-align: middle;
      font-size: 20px;
    }
    &:nth-child(1) svg {
      margin-right: 4px;
    }
    &:nth-child(2) svg {
      margin-left: 4px;
    }
  }
`;
