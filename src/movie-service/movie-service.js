

class MovieService {
  apiBase = 'https://api.themoviedb.org/3';

  api = `f6e61c65bcf3a91240c438d369606e19`

  async getResource(url) {
    const res = await fetch(`${this.apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return res.json();
  }
/* eslint-disable */

  async getSearch(movieName, pageNumber) { 
    if (movieName === '') {
      return;
    }
    const res = await this.getResource(
      `/search/movie?api_key=${this.api}&query=${movieName}&page=${pageNumber}`
    );
    const massData = await res.results.map((item) => { 
      return {
        id: item.id,
        title: item.original_title,
        text: item.overview,
        poster: item.poster_path,
        date: item.release_date,
        pageCount: res.total_pages,
      };
    });
    return massData 
  }
  async getFilmInfo(id) {
  const res = await this.getResource(
      `/movie/${id}?api_key=${this.api}`
    );
   return res 
  }

  async getGenres() {
  const res = await this.getResource(`/genre/movie/list?api_key=${this.api}&language=en-US`)
  return res
  }

  async getSessionId() {
    const session = await this.getResource(`/authentication/guest_session/new?api_key=${this.api}`)
    return session.guest_session_id
   }

  async getRatedList(id) {
  const res = await this.getResource(`/guest_session/${id}/rated/movies?api_key=${this.api}&sort_by=created_at.asc`);
  const massData = await res.results.map((item) => { 
    return {
      id: item.id,
      title: item.original_title,
      text: item.overview,
      poster: item.poster_path,
      date: item.release_date,
      pageCount: res.total_pages,
      rating:item.rating
    };
  });
  return massData 
  }
  
  async postRate (movieId,sessionId,value) {
  let response = await fetch(`${this.apiBase}/movie/${movieId}/rating?api_key=${this.api}&guest_session_id=${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(value)
    });
    let result = await response.json();
  }
 /* eslint-enable */ 
}

export default MovieService;
