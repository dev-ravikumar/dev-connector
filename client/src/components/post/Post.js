import React, { useEffect, Fragment } from 'react';
import { useDispatch  , useSelector} from 'react-redux';
import { getPost } from '../../actions/post';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import AddComment from './AddComment';

const Post = ({match}) => {
    const dispatch = useDispatch();
    const post = useSelector(state => state.post.post)
    useEffect(()=>{
       dispatch(getPost(match.params.id))  
    },[])
   
    return !post ? (<Spinner/>) :  (
        <Fragment>
     <Link to="/posts" className="btn">Back To Posts</Link>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${post.user}`}>
            <img
              className="round-img"
              src= {post.avatar}
              alt=""
            />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">
           {post.text}
          </p>
        </div>
      </div>
      <AddComment postid={post._id} post={post} />
        </Fragment>
    )
}

export default Post
