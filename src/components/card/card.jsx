/* eslint-disable */
import React, { Component } from 'react';
import { Rate } from 'antd';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { SessionConsumer } from '../session/session';
import CreateMovieRequests from '../../movie-service/create-movie-requests';

class Card extends Component {
  serv = new CreateMovieRequests()
  sessionId = ''
  state = {
    borderStyle: { border: `2px solid #E90000` },
    value: this.props.cardInfo.rating
  };
  genreKey = 0;
  borderStyle = () => {
    const { cardInfo } = this.props;
    const { voteAverage} = cardInfo;
    let color = '#E90000';
    if (voteAverage > 3 && voteAverage < 5) {
      color = '#E97E00';
    }
    if (voteAverage >= 5 && voteAverage <= 7) {
      color = '#E9D100';
    }
    if (voteAverage > 7) {
      color = '#66E900';
    }
    const border = `2px solid ${color}`;
    return {border}
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state;
    if (prevState.value !== value) {
      const { cardInfo } = this.props;
      const { id } = cardInfo;
      if (value !== 0 && typeof value !== 'undefined') {
        this.serv.postRate(id, this.sessionId, { value });
      }
    }
  }

  handleChange = (value) => {
    this.setState({ value });
  };

  getUrl = () => {
    let url;
    const { cardInfo } = this.props;
    const { poster } = cardInfo;
    if (!poster) {
      url =
        'data:image/png;base64,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';
    } else {
      url = `https://image.tmdb.org/t/p/original/${poster}`;
    }
    return url
  }

  getDate = () => {
    let date;
    const { cardInfo } = this.props;
    const { releazeDate} = cardInfo;
    try {
      date = format(new Date(releazeDate.split('-')), 'MMMM d, yyyy');
    } catch (error) {
      date = 'not date';
    }
    return date
  }

  render() {
    const { cardInfo } = this.props;
    const {  genreId, title, text ,id ,voteAverage } = cardInfo;
    const {  value } = this.state;
    const date = this.getDate()
    const url = this.getUrl()
    const borderStyle = this.borderStyle();
    return (
      <SessionConsumer>
        {(obj) => {
          let genresName = []
          this.sessionId = obj.sessionId
          genreId.map(item => {
            obj.genresList.genres.filter(i => item === i.id).map(elem => genresName.push(elem.name))
          })
          const cardGenres = genresName.map((item) => {
              this.genreKey = this.genreKey + 1
              return <li className="card__genre" key={this.genreKey}>{item}</li>
            }
          );
          return (
            // eslint-disable-next-line no-undef
            <li className="main__card card" key={id} id={id}>
              <div className="card__img" style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover' }}/>
              <div className="info">
                <span className="card__title">{title}</span>
                <span className="card__rate" style={borderStyle}>
                  <span>{voteAverage}</span>
                </span>
              </div>
              <span className="card__date">{date}</span>
              <ul className="card__genre-list">{cardGenres}</ul>
              <div className="card__text">{text}</div>
              <Rate
                allowHalf
                defaultValue={0}
                count={10}
                style={{ fontSize: '12px', position: 'absolute', right: '12px', bottom: '12px' }}
                value={value}
                onChange={this.handleChange}
              />
            </li>
          );
        }
        }
      </SessionConsumer>
    );
  }
}

export default Card;
Card.defaultProps = {
  cardInfo: {},
};
Card.propTypes = {
  cardInfo: PropTypes.shape({
    title: PropTypes.string,
    genreList: PropTypes.array, // eslint-disable-line
    text: PropTypes.string,
    poster: PropTypes.string,
    releazeDate: PropTypes.any, // eslint-disable-line
    id: PropTypes.number,
  }),
};
