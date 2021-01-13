const Card = ({cardInfo}) => {
    const genreList = cardInfo.genreList.map(item => {
     return <li className='card__genre'>{item}</li>
    })
    let url="https://image.tmdb.org/t/p/original/"+cardInfo.poster;
    if (!cardInfo.poster) {
     url ='' 
    }
     return (
       <li className="main__card card">
         <img className="card__img" 
         src={url}/>
        <div className="card__info">
          <span className="card__title">{cardInfo.title}</span>
          <span className="card__date">{cardInfo.date}</span>
          <ul className="card__genre-list">
           {genreList}
          </ul>
          <span className='card__text'>{cardInfo.text}</span>
        </div>
       </li>
     )
  }

  export default Card