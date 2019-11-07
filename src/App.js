import React from 'react';
import Routes from './routes';
import GlobalStyles from './styles/global';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number: {
      value: 400,
      density: {
        enable: true,
        value_area: 3000
      }
    },
    color: {
      value: "#ed1d24"
    },
    shape :{
      type: 'circle',
      stroke:{
        width:0,
        color:"#000000"
      },
      polygon:{
        nb_sides:3
      },
    },
    opacity:{
      value:0.8,
      random:true,
      anim:{
        enable:false,
        speed:1,
        opacity_min:0.1,
        sync:false
      }
    },
    size:{
      value:4,
      random:true,
      anim:{
        enable:true,
        speed:5,
        size_min:0.01,
        sync:false
      }
    },
    line_linked:{
      enable:false,
      distance:500,
      color:"#ffffff",
      opacity:0.4,
      width:1
    },
    move:{
      enable:true,
      speed:7.8,
      direction:"top",
      random:true,
      straight:false,
      out_mode:"out",
      bounce:false,
      attract:{
        enable:false,
        rotateX:600,
        rotateY:1200
      }
    }
  }
};

function App() {
  return (
    <>
      <Particles className="particles" params={particlesOptions} />;
      <GlobalStyles />
      <Routes />
   </>
  );
}

export default App;
