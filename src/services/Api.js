function fetchImages(query, page) {
  const API_KEY = '19112530-d5af3423794dd47ca2e19dee1';
  const URL = `https://pixabay.com/api/?&key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`;
  return fetch(URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`Something went wrong`));
    })
    .then((data) => {
      console.log(data);
      return data.hits;
    });
}

const API = { fetchImages };
export default API;
