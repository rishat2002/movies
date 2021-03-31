import React, { Component } from 'react';
import { Spin} from 'antd';
import RatedList from '../rated-list';
import Search from '../search';
import CreateMovieRequests from '../../movie-service/create-movie-requests';
import { SessionProvider } from '../session/session';
import 'antd/dist/antd.css';

class App extends Component {
  state = {
    rated: false,
    load:false,
    genresList:[]
  };

  serv = new CreateMovieRequests();


  componentDidMount() {
    this.serv.getSessionId().then((res) => {
      this.setState({ sessionId: res });
    });
   this.serv.getGenres().then ((res)=> {
     this.setState({genresList:res})
   })
  }

  ratedHandler = () =>{
    const {sessionId} = this.state
    this.setState({load:true})
    new CreateMovieRequests().getRatedList(sessionId).then((res) => {
      this.setState({ ratedList: res, rated: true,load:false });
    });
  }

  activeButton = () => {
    let searchBorderText = null;
    let ratedBorderText = null;
    const { rated} = this.state;
    if (rated) {
      ratedBorderText = { borderBottom: '2px solid #1890FF', color: '#1890FF' };
    } else {
      searchBorderText = { borderBottom: '2px solid #1890FF', color: '#1890FF' };
    }
    return {searchBorderText,ratedBorderText}
  }

  render() {
    const {  rated,ratedList, genresList,load,sessionId } = this.state;
    const el = rated ? <RatedList ratedList={ratedList} sessionId={sessionId}/> : <Search addRatedCard={this.addRatedCard} />;
    const {searchBorderText,ratedBorderText} = this.activeButton()
    return (
      <SessionProvider value={{genresList,sessionId}}>
        <div className="main">
          <div className="buttons">
            <button
              type="button"
              className="searchButton"
              onClick={() => {
                this.setState({ rated: false });
              }}
              style={searchBorderText}
            >
              Search
            </button>
            <button
              type="button"
              className="ratedButton"
              onClick={this.ratedHandler}
              style={ratedBorderText}
            >
              Rated
            </button>
          </div>
          {load?<Spin size="large" className="spin" />:null}
          {el}
        </div>
      </SessionProvider>
    );
  }
}

export default App;
