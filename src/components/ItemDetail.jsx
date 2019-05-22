import React from "react";
import { useState, useEffect, useContext } from "react";
import "./css/ItemDetail.css";
import serverUrl from "../url";
import axios from "axios";
import { UserContext } from "../UserProvider";
const authAxios = axios.create();

authAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function ItemDetail({ match, history }) {
  const { user } = useContext(UserContext);
  const [image, setImage] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [like, setLike] = useState(12);
  const [error, setError] = useState(null);

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
      await fetch(`${serverUrl}/reviews/${id}`)
        .then(result => result.json())
        .then(data => setReviews(data))
        .catch(e => console.log(e));
    }
    fetchReviews();
  }, [match]);

  const { _id, link, title, artist, medium, contributor } = image;
  function handleReview(id) {
    const url = `${serverUrl}/add-review`;
    console.log(id);
    const data = {
      postId: id,
      user: {
        author: user.name,
        profileURL: user.profileURL,
        userId: user._id
      },
      review: newReview
    };
    authAxios
      .post(url, {
        data
      })
      .then(d => {
        console.log(d);
        setReviews([d.data.data, ...reviews]);
        setNewReview("");
      })
      .catch(e => console.log(e));
  }
  const defaultSrc =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  const src = user.profileURL ? user.profileURL : defaultSrc;
  console.log(user);
  return (
    <div className="item-detail">
      {error}
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
          {user ? (
            <div className="add-review">
              <div className="profile-img">
                <img src={src} alt="profile-img" />
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
          ) : (
            <div>
              Please Login To Comment
              <button onClick={() => history.push("/login")}>Login</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Review({ review }) {
  console.log(review);
  const defaultSrc =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  const src = review.user
    ? review.user.profileURL
      ? review.user.profileURL
      : defaultSrc
    : defaultSrc;
  console.log(src);
  return (
    <div className="review">
      <div className="profile-img">
        <img src={src} alt="profile-img" />
      </div>
      <div className="review-content">
        <div className="name">{review.user ? review.user.author : null}</div>
        <div className="message">{review.review ? review.review : null}</div>
      </div>
    </div>
  );
}

export default ItemDetail;
