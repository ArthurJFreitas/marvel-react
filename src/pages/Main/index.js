import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'js-md5';
import { Spring } from 'react-spring/renderprops';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { FaSpinner, FaSearch } from 'react-icons/fa';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { Form, SubmitButton, List, Container, Logo, PageNav } from './styles';
import api from '../../services/api';


export default class Main extends Component{
    state = {
    query: '',
    results: [],
    loading: false,
    message: '',
    limit: 10,
    currentPage: 1,
    offset: 0,
    totalPages: 0,
  };



  fetchSearchResults = (query) =>{
     const PUBLIC_KEY = 'f5acc366a5af8d5f904bfc243cbba312';
     const PRIVATE_KEY = '7184a23884e7d0462982db4ee556c999dae9bfc5';
    // const PUBLIC_KEY = 'c146058717b086c76ee83042e6b83fce';
    // const PRIVATE_KEY = '196f861c531044705e2d6d19c52f07b315581170';
    this.cancel = '';

    const timestamp = Number(new Date().getTime())
    const hash = md5.create()
    hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

    const searchUrl = `characters?nameStartsWith=${query}&ts=${timestamp}&orderBy=name&limit=${this.state.limit}&apikey=${PUBLIC_KEY}&offset=${this.state.offset}&hash=${hash.hex()}`;
    const searchDefautl = `characters?&ts=${timestamp}&limit=${this.state.limit}&apikey=${PUBLIC_KEY}&offset=${this.state.offset}&hash=${hash.hex()}`;


    if(this.state.query === '' ||  this.state.query === ' ' || this.state.query === null){
      api.get( searchDefautl, ).then(
        resp => {
          this.setState({ results: resp.data.data.results, loading: false })
          let totalP = resp.data.data.total / this.state.limit;
          this.setState({ totalPages: parseInt(Math.ceil(totalP))})
        })
    }else{
    api.get( searchUrl, )
    .then( res => {
      if (res.data.data.total <= 0 ){
        api.get( searchDefautl, ).then(
          resp => {
            this.setState({ results: resp.data.data.results, loading: false })
            let totalP = resp.data.data.total / this.state.limit;
            this.setState({ totalPages: parseInt(Math.ceil(totalP))})
          })
      }else{
        this.setState({ results: res.data.data.results, loading: false })
        let totalP = res.data.data.total / this.state.limit;
        this.setState({ totalPages: parseInt(Math.ceil(totalP))})
      }
    })
  }
}
  componentDidMount(){

    if(this.state.query === ''){
      const query = ''
      this.fetchSearchResults(query);
      this.setState({ loading: false })

    }
    this.setState({ loading: false })

  }

  handleOnInputChange = async e =>{
    let query = e.target.value;
    if(!query){
      let query = ' '
      this.fetchSearchResults(query);
    }
    this.setState({ loading: false })
    this.setState( { query: query, loading: true, message: '',  } )
    this.fetchSearchResults(query);

    await this.setState({ currentPage: 1});
    const countPage = (this.state.currentPage - 1) * this.state.limit;
    await this.setState({ offset:countPage})
  };



  handlePage = async action => {
    const { currentPage } = this.state;
    await this.setState({ currentPage: action === 'back' ? currentPage - 1 : currentPage + 1 });

    const countPage = (this.state.currentPage - 1) * this.state.limit;
    await this.setState({ offset:countPage})
    this.fetchSearchResults(this.state.query);
    window.scroll({top: 300, left: 0, behavior: 'smooth' })
  };



  render(){
    const { query, results, currentPage, loading, totalPages } = this.state;

    return(
      <Spring  from={{ opacity: 0 }}
      to={{ opacity: 1 }}>
      {props => (
        <div style={props}>
          <Logo>
            <div>
              <img src="https://i.imgur.com/Rt71yx4.png" alt="marvel-logo"/>
            </div>
          </Logo>
           <Container>
            <Form onSubmit={e => { e.preventDefault(); }} >
              <input
              type="text"
              placeholder="Search your favorite marvel Super-Hero"
              value={query}
              onChange={this.handleOnInputChange}
            />
            <SubmitButton loading={loading ? 1 : 0} empty={!query}>
              {loading ? (
                <FaSpinner color="#fff" size={14} />
              ) : (
                <FaSearch color="#fff" size={14} />
              )}
            </SubmitButton>
            </Form>

            <List>
              {results.map(result => (

            <Flippy
            flipOnHover={true} // default false
            flipOnClick={false} // default false
            flipDirection="vertical" // horizontal or vertical
            ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()

            >
            <FrontSide>
                <li key={result.id}>
                    <Link to={`/details/${result.id}`}>
                      <img src={`${result.thumbnail.path}.${result.thumbnail.extension}`} alt={result.name}/>
                      <div>
                        <h2>{result.name}</h2>
                        <span>{result.description}</span>
                      </div>
                    </Link>
                </li>
                </FrontSide>
                <BackSide>
                <li key={result.id}>
                    <Link to={`/details/${result.id}`}>
                      <img src={`${result.thumbnail.path}.${result.thumbnail.extension}`} alt={result.name}/>
                      <div>
                        <h2>{result.name}</h2>
                        <h3>Click to see Details</h3>
                      </div>
                    </Link>
                </li>
                </BackSide>
                </Flippy>
              ))}

            <PageNav>
              <button
                type="button"
                disabled={currentPage < 2}
                onClick={() => this.handlePage('back')}
              >
            <GoArrowLeft />
              Prev. Page
            </button>
            <button
            disabled={totalPages < currentPage}
            type="button" onClick={() => this.handlePage('next')}>
              Next Page
              <GoArrowRight />
            </button>
          </PageNav>
            </List>
          </Container>
        </div>
      ) }
    </Spring>
    )
  }
}
