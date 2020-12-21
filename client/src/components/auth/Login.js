import React, { Fragment , useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch  ,useSelector} from 'react-redux';
import { login } from '../../actions/auth';

export const Login = () => {

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
    const [formData, setformData] = useState({
        email:'',
        password : '',
    })

    const {  email,password } = formData;

    const onChange = e => setformData({ ...formData , [e.target.name] : e.target.value});

    const onSubmit = e =>{
        e.preventDefault();
        dispatch(login(email,password));
    }

    // Redirect if is Auth
    if(isAuth){
      return <Redirect to='/dashboard'/>
    }

    return (
        <Fragment>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign In To Your Account</p>
        <form className="form" onSubmit = {e => onSubmit(e) }>
        
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} required />
          
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password} onChange={e => onChange(e)}
              minLength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Not having an account? <Link to="/register">Sign Up</Link>
        </p>
        </Fragment>
    )
}

export default Login;