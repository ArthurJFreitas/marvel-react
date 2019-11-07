import { createGlobalStyle } from 'styled-components';
import bg from '../assets/marvel-bg.jpg'


export default createGlobalStyle`
  * {
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
    font-family: 'Roboto', sans-serif;
    margin: 0px;
    padding: 0px;
    outline: 0px;
    box-sizing: border-box;
  }
  html, body, #root{
    min-height: 100%;
    .particles{
      position: absolute;
      height: 100%;
      width: 100%;
      z-index: -1;
    }
  }

  body{
    background-image: url(${bg});
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    -webkit-font-smoothing: antialiased !important;
  }
  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
  }
  button{
    cursor: pointer;
  }

  .flippy-front,
.flippy-back
{ box-shadow: none}

.slick-slide{
  margin-bottom: 75px;
}


.slick-slide img {
  width: 262px;
    height: 334px;
}

.slick-next:before, .slick-prev:before {
  color: #e2001a !important;
}

.inner-slider{
  display: block;
  margin: 10px 10px;
  width: 215px;
  height: 285px;
}

.titles {
    text-align: center;
    padding: 20px;

    h2{
      border-bottom: 1px solid #c3c3c3;
      padding-bottom: 15px;
      color: #e2001a;
    }
}

a{
      text-decoration: none;
      color: #e2001a;
      font-weight: 700;
    }


  .back-card{
    width: 262px;
    height: 334px;
    background: #e2001a;
    color: #fff;
    align-content: center;
    display: grid;
    text-align: center;
  }

  .flippy-front, .flippy-back{
    padding: 0 !important;
  }

`;
