import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Spin, Alert, Pagination } from 'antd';
import * as _ from 'lodash';
import SearchPanel from '../search-panel';
import 'antd/dist/antd.css';
import CardList from '../card-list';
import MovieService from '../../movie-service/movie-service';

class Search extends Component {
  servData = new MovieService();

  errorName = null;

  state = {
    cardList: [],
    error: false,
    load: false,
    searchString: '',
    current: 1,
    pageCount: 5,
    pagination: false,
    filmNotFound: false,
  };

  f = _.debounce(
    () => {
      const { searchString, current } = this.state;
      this.updateState(searchString, current);
    },
    1000,
    { leading: false, trailing: true }
  );
  /* eslint-disable */
  componentDidUpdate(prevProps, prevState) {
    const { searchString, current } = this.state;
    if (searchString !== prevState.searchString || current !== prevState.current) {
      this.setState({ pagination: true, filmNotFound: false });
      if (current === prevState.current) {
        this.setState({ current: 1 });
      }
      this.setState({ error: false, load: true });
      this.f();
    }
  }
  /* eslint-enable */

  showError = (err) => {
    this.errorName = `${err.name} ${err.message}`;
    this.setState({ error: true,pagination:false });
  };

  onPageChange = (page) => {
    this.setState({
      current: page,
    });
  };

  updateSearchString = (value) => {
    this.setState({ searchString: value });
  };

  updateState(movieName, pageNumber) {
    this.servData
      .getSearch(movieName, pageNumber)
      .then((res) => {
        if (movieName === '') {
          this.setState({ cardList: [], load: false, pagination: false });
          return;
        }
        this.setState({
          load: false,
        });
        if (res.length === 0 && movieName !== '') {
          this.setState({
            filmNotFound: true,
          });
        }
        this.setState({
          /* eslint-disable */ pageCount: res[0].pageCount,
          cardList: res.map((item) => {
            return {
              title: item.title,
              genreList: ['action', 'drama'],
              text: item.text,
              poster: item.poster,
              releazeDate: item.date,
              id: item.id,
            };
          }),
        });
      })
      .catch(this.showError);
  }
  /* eslint-enable */

  render() {
    const { error, load, cardList, filmNotFound, pagination, current, pageCount } = this.state;
    let errorComponent = error ? <Alert message="Error" description={this.errorName} type="error" showIcon /> : null;
    let content = null;
    let filmNotFoundComponent = null;
    const { addRatedCard } = this.props;
    if (!filmNotFound) {
      if (load && !error) {
        content = <Spin size="large" className="spin" />;
      } else {
        content = <CardList list={cardList} addRatedCard={addRatedCard} />;
      }
    }
    if (filmNotFound) {
      filmNotFoundComponent = <Alert message="Поиск не дал результатов" type="info" className="filmNotFound" />;
      errorComponent = null;
    }
    console.log(pagination)
    let paginationComponent =
      !load && pagination && !filmNotFound ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            defaultCurrent={1}
            total={pageCount * 10}
            current={current}
            onChange={this.onPageChange}
            className="pagination"
            size="small"
          />
        </div>
      ) : null;
  if (errorComponent!==null) {
    paginationComponent=null 
    } 
    return (
      <div>
        <section className="main__content">
          <SearchPanel updateSearchString={this.updateSearchString} />
          {filmNotFoundComponent}
          {content}
          {errorComponent}
          {paginationComponent}
        </section>
      </div>
    );
  }
}
export default Search;

Search.defaultProps = {
  addRatedCard: () => {},
};
Search.propTypes = {
  addRatedCard: PropTypes.func,
};
