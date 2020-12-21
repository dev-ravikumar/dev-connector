import React, { useState , Fragment} from 'react';
import { useDispatch , useSelector} from 'react-redux';
import { addComment } from '../../actions/post';
import CommentItems from './CommentItems';

const AddComment = ({post : {_id}}) => {
    const [text, settext] = useState('');
    const comment = useSelector(state => state.post.post.comment)
    const dispatch = useDispatch();
    return (
        <Fragment> 
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form className="form my-1" onSubmit={e => {
                e.preventDefault();
             dispatch(addComment(_id , text))
             settext('')
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            value = {text}
            onChange={e => settext(e.target.value)}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
      <div class="comments">
          {comment.map(comment =>(
                <CommentItems key={comment._id} comment={comment}  postid={_id} />
          ))}
        </div>
      </Fragment>
    )
}

export default AddComment
