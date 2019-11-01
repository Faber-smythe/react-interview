import React from 'react';
import {ReactComponent as Delete} from '../img/delete.svg';
import {ReactComponent as ThumbUp} from '../img/thumb_up.svg';
import {ReactComponent as ThumbDown} from '../img/thumb_down.svg';
import LikesRatio from '../Components/LikesRatio.js';
import decoration from '../img/decoration.png';

export default function MovieCard(props){
  const {title, category, likes, dislikes, vote} = props.movie;
  const {upVote, downVote, deleteMovie} = props;

  return(
    <div className="movie-card">
      <img src={decoration} className="decoration" alt="just a movie reel patern"/>
      <Delete className="delete-button" onClick={(e) => deleteMovie(props.movie)}/>
      <h2>{title}</h2>
      <p>— {category}</p>
      <p className="likes-ratio-row">
        <ThumbUp className={`vote_thumb ${vote === 'up' ? 'voted' : ''}`} onClick={(e) => upVote(props.movie)}/>
        {likes}
        <LikesRatio likes={likes} dislikes={dislikes}/>
        {dislikes}
        <ThumbDown className={`vote_thumb ${vote === 'down' ? 'voted' : ''}`} onClick={(e) => downVote(props.movie)}/>
      </p>
    </div>
  )
}
