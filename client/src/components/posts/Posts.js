import React , {useEffect, Fragment} from 'react';
import {useDispatch , useSelector} from 'react-redux';
import Spinner from '../layout/Spinner';
import { getAllPosts } from '../../actions/post';
import PostItems  from './PostItems';
import AddPosts from './AddPosts';

const Posts = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.post.loading);
    const posts = useSelector(state => state.post.posts);

    useEffect(() =>{
        dispatch(getAllPosts())
    },[dispatch])
    return loading ? (<Spinner/>) : (
        <Fragment>
           <h1 className="large text-primary">
        Posts
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
      <AddPosts />
      <div className="posts">
      {posts.map((post) =>(
           <PostItems key={post._id} post = {post} />
      ))}
      </div>
    
     
        </Fragment>
    )
}

export default Posts
