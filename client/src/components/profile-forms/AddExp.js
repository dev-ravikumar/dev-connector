import React, { Fragment, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import{ useDispatch } from 'react-redux';
import {addExp } from '../../actions/profile';

const AddExp = ({history}) => {
    const [formdata, setformdata] = useState({
      title : '',
      company : '',
      location : '',
      from : '',
      to : '',
      current : false,
      description : ''
    });
    const {company , location , title , from, to , current, description} = formdata;
    const onChange = e => setformdata({...formdata , [e.target.name] : e.target.value})
    const [check, setcheck] = useState(false);
    const dispatch = useDispatch();
    return (
        <Fragment>
        <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e =>{
        e.preventDefault();
        dispatch(addExp(formdata , history))
      } }>
        <div className="form-group">
          <input type="text" placeholder="* Job Title" name="title" value={title} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" value={company} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"  onChange={e => onChange(e)}/>
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" 
          checked={current}
           value={current} 
           onChange={e =>{
            setformdata({...formdata, current : !current});
            setcheck(!check)}
           }
        /> Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" disabled={check} value={to} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    
        </Fragment>
    )
}

export default withRouter(AddExp); 
