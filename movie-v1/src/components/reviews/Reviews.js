import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig';
import {useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'

const Reviews = ({getMoviedata, movie, reviews, setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        if (movieId) {
            getMoviedata(movieId);
        }
    }, [movieId]);

    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;

        try {

            const response = await api.post("/api/v1/reviews",{reviewBody:rev.value, imdbId:movieId});

            const updateReviews = [...reviews, {body:rev.value}];

            rev.value = "";

            setReviews(updateReviews);
            
        } catch (error) {
            console.error(error);
        }

        
    }

  return (
    <Container>
        <Row>
            <Col><h3>Reviews</h3></Col>
        </Row>
        <Row className="mt-2">
            <Col>
            <img src={movie?.poster} alt="" />
            </Col>
            <Col>
                {
                    <>
                    <Row>
                        <Col>
                            <ReviewForm handleSubmit={addReview} revText={revText}
                                labelText="Write a review"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr />
                        </Col>
                    </Row>
                    </>
                }
                {
                    reviews?.map((r, id) => {
                        return (
                            <>
                                <Row key={`review-body-${id}`}>
                                    <Col> {r.body} </Col>
                                </Row>
                                <Row key={`review-separator-${id}`}>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </>
                        )
                    })
                }
            </Col>
        </Row>   
        <Row>
            <Col>
                <hr />
            </Col>
        </Row> 
    </Container>
  )
}

export default Reviews