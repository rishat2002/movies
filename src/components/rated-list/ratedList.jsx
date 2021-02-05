import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import CardList from '../card-list';



class RatedList extends Component {
    state = {
      current: 1,
      ratedList:[]
    };

    componentDidMount() {
    const {ratedList} = this.props
    this.setState({ratedList})
    }

    onChange = page => {
      this.setState({
        current: page,
      });
    };

    

    render() {
      const {current,ratedList} = this.state
      const paginationComponent = ratedList.length>20?
          <Pagination
            defaultCurrent={1}
            total={ ratedList.page*10}
            current={current}
            className="pagination"
            onChange={this.onChange}
            size="small"
          />:null
  ;
      return (
        <div className="main">
          <section className="main__content">
          <CardList list={ratedList}/>
            {paginationComponent}
          </section>
        </div>
      );
    }
  }
  export default RatedList

  RatedList.defaultProps = {
    ratedList:[]               //eslint-disable-line
  };

  RatedList.propTypes = {
    ratedList:PropTypes.array, //eslint-disable-line
  }