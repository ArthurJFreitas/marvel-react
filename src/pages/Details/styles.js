import styled from 'styled-components';

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
  }
`;


export const Header = styled.div`

  margin-bottom: 75px;

  .grid {
  	display: grid;
    grid-template-rows: 1fr 140px;
    text-align: center;

    img{
      margin-bottom: 10px;
    }
  }

  .grid-row{
    display: grid;
    grid-template-rows: 1fr 1fr;

    h2{
      align-self: center;
      padding: 10px;
      color: #e2001a;
      border-top: 1px solid #c3c3c3;
      border-bottom: 1px solid #c3c3c3;
    }
    span{
      margin: 0 25px;
      line-height: 20px;
    }
  }


img {
    max-width: 200px;
    border-radius: 50%;
    max-height: 200px;
    border: 2px solid #c3c3c3;
}

`

