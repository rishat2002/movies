import React,{Component} from 'react';
import { format } from 'date-fns'
import { Spin } from 'antd';
import { Alert } from 'antd';
import 'antd/dist/antd.css';
import CardList from '../card-list/card-list'
import MovieService from '../../movie-service/movie-service'
import Search from '../search/search'
import * as _ from 'lodash';
import { Pagination } from 'antd';


class App extends Component {
    servData = new MovieService()
    errorName = null;
    state = {
      cardList:[],
      error:false,
      load:false,
      searchString:null,
      current: 1,
      pageCount:5,
      pagination:false
    }

    onPageChange = page => {
      this.setState({
        current: page,
      });
    };

    showError = (err) => {
      this.errorName = err.name+" "+err.message
      this.setState({error:true})
    }
    updateState(movieName,pageNumber) {
      this.servData.getSearch(movieName,pageNumber).then((res)=>{
        if(movieName===''){
          this.setState({cardList:[],
          load:false,
          pagination:false})
          return
        }
        this.setState({
          load:false
        })
        this.setState({
          pageCount:res[0].pageCount,
          cardList:res.map((item)=>{
          let date;
          try {
          date=format(new Date(...item.date.split('-')),'MMMM d, yyyy') 
          }
          catch(e) {
          date="not date"
          }
            return {
              title:item.title,
              genreList:['action','drama'],
              text:item.text,
              poster:item.poster,
              date:date,
            }
          })})
      }).catch(this.showError)
    }


    f = _.debounce(()=>{
      this.updateState(this.state.searchString,this.state.current)
      },1000,{leading:false,
      trailing:true})
    
    componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.searchString!==prevState.searchString || this.state.current!==prevState.current) {
        this.setState({pagination:true})
      if (this.state.current==prevState.current){
        this.setState({current:1})
      }
      this.setState({error:false,
      load:true})
      this.f()
    }
  }
    
    updateSearchString = (value) => {
      this.setState({searchString:value})
    }
    constructor () {
      super();
    }
        render () { 
        const error = this.state.error?<Alert
        message="Error"
        description={this.errorName}
        type="error"
        showIcon/>:null;
        const content = this.state.load?<Spin size="large" className='spin'/>:<CardList list={this.state.cardList}/>;
        const pagination = !this.state.load && this.state.pagination?<Pagination defaultCurrent={1} total={this.state.pageCount*10} current={this.state.current} onChange={this.onPageChange}/>:
        null;
        return (<div className='main'>
        <section className="main__content">
        <Search updateSearchString={this.updateSearchString}/>
        {content}
        {error}
        {pagination}
        </section>
        </div>)
 }
};

export default App;
