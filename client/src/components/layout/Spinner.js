import React, { Fragment } from 'react';
import spinner from './spinner.jpg'

const Spinner = () => {
    return (
      <Fragment>
          <img src={spinner} alt = "loading ....." />
      </Fragment>
    )
}

export default Spinner

