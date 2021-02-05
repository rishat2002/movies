import React, { Component } from 'react';
import RatedList from '../rated-list';
import Search from '../search';
import MovieService from '../../movie-service/movie-service';
import { SessionProvider } from '../session/session';

class App extends Component {
  state = {
   rated :false,
   sessionId :1
  };

  serv = new MovieService()

  constructor() {
  super()  
  this.serv.getSessionId().then((res)=>{
    this.setState({sessionId:res})
  })
  }
 /* eslint-disable */ 

/* eslint-enable */
  render() {
    let searchBorderText = null;
    let ratedBorderText = null;
    const {rated,ratedList,sessionId} = this.state
    if (rated) {
      ratedBorderText={borderBottom:'2px solid #1890FF',
      color:'#1890FF'
    }
    }
    else {
      searchBorderText={borderBottom:'2px solid #1890FF',
    color:'#1890FF'}
    }
    const el = rated?<RatedList ratedList={ratedList}/>:<Search addRatedCard={this.addRatedCard}/>

    return (
      <SessionProvider value={sessionId}>
    <div className="main">
      <div className='buttons'>
      <button type='button' className='searchButton' onClick ={()=>{
      this.setState ({rated:false});
      }} style={searchBorderText}>Search</button>
      <button type='button' className = 'ratedButton' onClick = {() =>{
        new MovieService().getRatedList(sessionId).then((res) => {
          this.setState({ratedList:res,rated:true})
        })
      }} style={ratedBorderText}>Rated</button>  
      </div>
     {el}
     </div>
     </SessionProvider>  
    );
  }
}

export default App;
