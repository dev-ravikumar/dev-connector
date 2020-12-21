import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { useSelector , useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { addLike , removeLike , deletePost } from '../../actions/post';

const PostItems = ({post : {_id ,user, likes , comment ,  name , avatar , text , date}}) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    return (
        <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              className="round-img"
              src={avatar}
              alt=""
            />
            <h4>{name}</h4> 
          </Link>
        </div>
        <div>
          <p className="my-1">
            {text}
          </p>
           <p className="post-date">
    Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
        
            <button type="button" onClick={e => dispatch(addLike(_id))} className="btn btn-light">
            <i className="fas fa-thumbs-up"></i>
            {likes.length > 0 && (
          <span>{likes.length}</span>
            )}
          
          </button>
          <button type="button" onClick={e => dispatch(removeLike(_id))} className="btn btn-light">
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to={`post/${_id}`} className="btn btn-primary">
    Discussion 
    { comment.length > 0 && (
 <span className='comment-count'>{comment.length}</span>
    )}
   
          </Link>
          {!auth.loading && auth.user._id === user && (
   <button      
   type="button"
   className="btn btn-danger"
   onClick={e => dispatch(deletePost(_id))}
 >
   <i className="fas fa-times"></i>
 </button>
          )}
         
      
       
        </div>
      </div>
    )
}





export default PostItems
