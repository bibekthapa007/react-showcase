import React from "react";
import { useState, useEffect } from "react";
import "./ItemDetail.css";
import serverUrl from "../url";

function ItemDetail({ match }) {
  const [image, setImage] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [like, setLike] = useState(12);

  useEffect(() => {
    async function fetchImages() {
      const id = match.params.id;
      console.log(id, "image id");
      await fetch(`${serverUrl}/image/${id}`)
        .then(result => result.json())
        .then(data => setImage(data.image))
        .catch(e => console.log(e));
    }
    fetchImages();
  }, [match]);
  useEffect(() => {
    async function fetchReviews() {
      const id = match.params.id;
      await fetch(`${URL}/reviews/${id}`)
        .then(result => result.json())
        .then(data => setReviews(data))
        .catch(e => console.log(e));
    }
    fetchReviews();
  }, [match]);

  const { _id, link, title, artist, medium, contributor } = image;
  function handleReview(id) {
    const url = `${URL}/add-review`;
    console.log(id);
    const data = {
      postId: id,
      user: {
        author: "Bibek Thapa",
        profileURL:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      },
      review: newReview
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(d => {
        setReviews([d.data, ...reviews]);
        setNewReview("");
      })
      .catch(e => console.log(e));
  }
  return (
    <div className="item-detail">
      <div className="item-img">
        <div className="main-img ">
          <img src={link} alt="images" />
          <div className="img-helper">h</div>
        </div>
        <div className="img-overview">
          <div className="img-deatil">
            <div className="img-name">{title}</div>
            <div className="img-author">
              by <span> {artist} </span>
            </div>
          </div>
          <div className="img-like" onClick={() => setLike(like + 1)}>
            {like}
            <span aria-label="like" role="img">
              👍
            </span>
          </div>
        </div>
        <div className="review-section">
          {reviews
            ? reviews.map(review => {
                return <Review key={review._id} review={review} />;
              })
            : null}
          <div className="add-review">
            <div className="profile-img">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="profile-img"
              />
            </div>
            <textarea
              type="text"
              value={newReview}
              title="add-review"
              onChange={e => setNewReview(e.target.value)}
            />
            {newReview.length > 0 ? (
              <button onClick={() => handleReview(_id)}>Post</button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function Review({ review }) {
  return (
    <div className="review">
      <div className="profile-img">
        <img
          src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="profile-img"
        />
      </div>
      <div className="review-content">
        <div className="name">{review.user.author}</div>
        <div className="message">{review.review}</div>
      </div>
    </div>
  );
}

export default ItemDetail;
