import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../slices/movieSlice";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [favorites, setFavorites] = useState([]); // Local state to store favorites

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (user?.id) {
          const response = await axios.get(`http://localhost:4000/movie/getFavorites/${user.id}`);
          setFavorites(response.data.favorites); // Ensure API response has 'favorites' key
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [user?.id]); // Runs whenever user ID changes

  const handleRemoveFavorite = async (movie) => {
    try {
      dispatch(toggleFavorite({ movie, userId: user.id }));

      // Update local state after removing from favorites
      setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <Container className="mt-5 pt-4">
      <h4>Favorite Movies</h4>
      <Row>
        {favorites.length === 0 ? <p>No favorite movies added yet.</p> :
          favorites.map((movie) => (
            <Col key={movie.imdbID} md={3}>
              <Card className="mb-3">
                <Card.Img variant="top" src={movie.Poster} />
                <Card.Body>
                  <Card.Text>
                    Genre: {movie.Genre} <br />
                    IMDb: {movie.imdbRating} <br />
                    Rated: {movie.Rated} <br />
                    Released: {movie.Released} <br />
                    Runtime: {movie.Runtime} <br />
                    Language: {movie.Language}
                  </Card.Text>
                  <Button variant="danger" onClick={() => handleRemoveFavorite(movie)}>
                    Remove from Favorites
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Row>
    </Container>
  );
};

export default Dashboard;
