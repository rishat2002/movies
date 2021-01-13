import React,{Component} from 'react';
class Search extends Component {
  state = {
      value:''
  }
  
  render () {
     const input = (e) =>{
        this.setState({value:e.target.value})
        updateSearchString (e.target.value) 
    }
     const {updateSearchString} = this.props;
     return <input className="main__search-panel" placeholder="Type to search..."  value={this.state.value} onChange={input}/>}
}

export default Search