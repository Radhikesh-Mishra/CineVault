import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Card, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie, fetchHistory, toggleFavorite } from "../slices/movieSlice";
import axios from "axios";

const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const dispatch = useDispatch();
  const { searchResults, history } = useSelector((state) => state.movies);
  const { user } = useSelector((state) => state.auth);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (user?.id) {
          const response = await axios.get(`http://localhost:4000/movie/getFavorites/${user.id}`);
          setFavorites(response.data.favorites || []);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      dispatch(fetchMovie(search));
      setSearch("");
    }
  };

  const handleFavorite = async (movie) => {
    if (!user) {
      alert("Please log in to add favorites!");
      return;
    }

    try {
      const { payload } = await dispatch(toggleFavorite({ movie, userId: user.id }));

      if (payload?.updatedFavorites) {
        setFavorites(payload.updatedFavorites); // ✅ Correctly update favorites state
      }
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const isFavorite = (movie) => (favorites || []).some((fav) => fav.imdbID === movie.imdbID);

  return (
    <Container className="mt-5 pt-4">
      <Form onSubmit={handleSearch} className="mb-4">
        <Row>
          <Col xs={9}>
            <Form.Control
              type="text"
              placeholder="Search for a movie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col>
            <Button type="submit" variant="primary">Search</Button>
          </Col>
        </Row>
      </Form>

      <h3>Search Results</h3>
      <Row>
        {searchResults.map((movie) => (
          <Col key={movie.imdbID} md={3}>
            <Card onClick={() => setSelectedMovie(movie)} className="mb-3">
              <Card.Img variant="top" src={movie.Poster} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>
                  Genre: {movie.Genre} <br />
                  IMDb: {movie.imdbRating} <br />
                  Rated: {movie.Rated} <br />
                  Released: {movie.Released} <br />
                  Runtime: {movie.Runtime} <br />
                  Language: {movie.Language}
                </Card.Text>
                <Button
                  variant={isFavorite(movie) ? "danger" : "warning"}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(movie);
                  }}
                >
                  {isFavorite(movie) ? "Remove Favorite" : "Add Favorite"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <hr />

      <h3>Recent Searches</h3>
      <Row>
        {history.slice(0, 10).map((movie) => (
          <Col key={movie.imdbID} md={3}>
            <Card onClick={() => setSelectedMovie(movie)} className="mb-3">
              <Card.Img variant="top" src={movie.Poster} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>
                  Genre: {movie.Genre} <br />
                  IMDb: {movie.imdbRating} <br />
                  Rated: {movie.Rated} <br />
                  Released: {movie.Released} <br />
                  Runtime: {movie.Runtime} <br />
                  Language: {movie.Language}
                </Card.Text>
                <Button
                  variant={isFavorite(movie) ? "danger" : "warning"}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavorite(movie);
                  }}
                >
                  {isFavorite(movie) ? "Remove Favorite" : "Add Favorite"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={!!selectedMovie} onHide={() => setSelectedMovie(null)} centered>
        {selectedMovie && (
          <Modal.Body className="text-center">
            <h5>Title: <strong>{selectedMovie.Title}</strong></h5>
            <div className="d-flex flex-column align-items-center">
              <img
                src={selectedMovie.Poster}
                alt={selectedMovie.Title}
                style={{ width: "60%", borderRadius: "10px", marginBottom: "10px" }}
              />
              <p>{selectedMovie.Plot}</p>
              <p><strong>IMDb:</strong> {selectedMovie.imdbRating}</p>
              <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
              <p><strong>Director:</strong> {selectedMovie.Director}</p>
              <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
              <p><strong>Language:</strong> {selectedMovie.Language}</p>
              <p><strong>Country:</strong> {selectedMovie.Country}</p>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </Container>
  );
};

export default Home;
