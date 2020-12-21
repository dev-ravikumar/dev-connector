import React, { Fragment , useState} from 'react'
import { withRouter, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addEdu } from  '../../actions/profile';

const AddEducation = ({history}) => {

const [formdata, setformdata] = useState({
    school : '',
    degree :'',
    fieldofstudy : '',
    from : '', 
    to : '',
    current : false,
    description : ''
});
const { school, degree, fieldofstudy,from,to,current,description } = formdata;
const [check, setcheck] = useState(false);
const onchange = e => setformdata({...formdata , [e.target.name]  : e.target.value});
const dispatch = useDispatch()

    return (
       <Fragment>
 <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e =>{
          e.preventDefault();
          //console.log(formdata)
          dispatch(addEdu(formdata , history))
      }}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={e => onchange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree}
            onChange={e => onchange(e)}
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy"   value={fieldofstudy}
            onChange={e => onchange(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"    value={from}
            onChange={e => onchange(e)}/>
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current"  value={current} checked={current}
            onChange={e =>{
                setformdata({...formdata , current : !current})
                setcheck(!check)
            }} /> Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" disabled={check}  value={to}
            onChange={e => onchange(e)}/>
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={e => onchange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>

       </Fragment>
            
     
    )
}

export default withRouter(AddEducation);
