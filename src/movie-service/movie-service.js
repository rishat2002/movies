class MovieService {
    _apiBase = 'https://api.themoviedb.org/3';
  
    async getResource(url) {
      const res = await fetch(`${this._apiBase}${url}`);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
          `, received ${res.status}`)
      }
      return await res.json();
    }
  
    async getSearch(movieName,pageNumber) {
      if(movieName===''){
        return
      }
      const res = await this.getResource(
        `/search/movie?api_key=f6e61c65bcf3a91240c438d369606e19&query=${movieName}&page=${pageNumber}`);
      return res.results.map((item) => { 
        return {
          id:item.id,
          title:item.original_title,
          text:item.overview,
          poster:item.poster_path,
          date:item.release_date,
          pageCount:res.total_pages
        }
      })
    }
  }

  export default MovieService;