import api from '../../services/api';
import loadgif from '../../assets/load.gif';
import { Container, Header, Logo } from './styles';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'js-md5';
import Slider from "react-slick";
import "./css/slick/slick.min.css";
import "./css/slick/slick-theme.min.css";
import LoadingScreen from 'react-loading-screen';
import { GoArrowLeft } from 'react-icons/go';
import Flippy, { FrontSide, BackSide } from 'react-flippy';



export default class Repository extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    results: [],
    loading: true,
    comics: [],
    series: [],
    events: [],
    stories: [],
  };

  async componentDidMount() {
    const { match } = this.props;

    const idHero = decodeURIComponent(match.params.id);
    const PUBLIC_KEY = 'f5acc366a5af8d5f904bfc243cbba312';
    const PRIVATE_KEY = '7184a23884e7d0462982db4ee556c999dae9bfc5';
   // const PUBLIC_KEY = 'c146058717b086c76ee83042e6b83fce';
   // const PRIVATE_KEY = '196f861c531044705e2d6d19c52f07b315581170';
   this.cancel = '';

   const timestamp = Number(new Date().getTime())
   const hash = md5.create()
   hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

    const searchDefault = `characters/${idHero}?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`;
    const searchComics = `characters/${idHero}/comics?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`;
    const searchSeries= `characters/${idHero}/series?ts=${timestamp}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`;


    const [defaults, comics , series ] = await Promise.all([
      await api.get(searchDefault),
      await api.get(searchComics),
      await api.get(searchSeries)
    ]);

    this.setState({
      results: defaults.data.data.results,
      comics: comics.data.data.results,
      series: series.data.data.results,
      loading: false,
    });

  }


  render() {
    const { results, comics, series, loading } = this.state;

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      variableWidth: true,
      rows: 1,
    };

    var IMAGE_NOT_AVAIL = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

    var filteredComics = comics.filter(function(c) { return c.thumbnail.path !== IMAGE_NOT_AVAIL; });
    var filteredSeries = series.filter(function(s) { return s.thumbnail.path !== IMAGE_NOT_AVAIL; });


    return(

      <LoadingScreen
      loading={loading}
      bgColor='#222'
      spinnerColor='#ED1D24'
      textColor='#ED1D24'
      logoSrc={loadgif}
      text='Loading Components'
    >
      <Logo>
          <div>
            <img src="https://i.imgur.com/Rt71yx4.png" alt="marvel-logo"/>
        </div>
      </Logo>
      <Container>
        <div>
          <Link to="/">
            <GoArrowLeft /> Back to home
          </Link>
        </div>
        <Header>
              {results.map(result =>(
                <div className="grid" key={result.id}>
                  <div>
                     <img src={`${result.thumbnail.path}.${result.thumbnail.extension}`} alt={result.name}/>
                  </div>
                  <div className="grid-row">
                    <h2>{result.name}</h2>
                    <span>{result.description}</span>
                  </div>
                </div>
              ))}
        </Header>
        <div className="titles">
          <h2>Related Comics</h2>
        </div>
          <Slider {...settings}>
            {
               filteredComics.map(comic =>(
               <div key={comic.id} className="inner-slider">
               <Flippy
                  flipOnHover={true} // default false
                  flipOnClick={false} // default false
                  flipDirection="horizontal" // horizontal or vertical
                  ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                >
                  <FrontSide>
                    <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt=""/>
                  </FrontSide>
                  <BackSide>
                    <div className="back-card">
                      <h2>
                        {comic.title}
                      </h2>
                    </div>
                  </BackSide>
                </Flippy>
              </div>
            ))}
          </Slider>
          <div className="titles">
            <h2>Related Serie</h2>
          </div>
          <Slider {...settings}>
            {
               filteredSeries.map(serie =>(
              <div key={serie.id} className="inner-slider">
                <Flippy
                  flipOnHover={true} // default false
                  flipOnClick={false} // default false
                  flipDirection="horizontal" // horizontal or vertical
                  ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
                >
                  <FrontSide>
                    <img src={`${serie.thumbnail.path}.${serie.thumbnail.extension}`} alt=""/>
                  </FrontSide>
                  <BackSide>
                    <div className="back-card">
                      <h2>
                        {serie.title}
                      </h2>
                    </div>
                  </BackSide>
                </Flippy>
              </div>
            ))}
          </Slider>


      </Container>

      </LoadingScreen>
    )
  }
}
