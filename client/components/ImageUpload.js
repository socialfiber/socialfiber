import React, { Component } from 'react';
import { handleImageUpload } from '../actions/handleImageUpload'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class ImageUpload extends Component {




    render(){
      //let photoReader = new FileReader()
      const { handleSubmit, submitting } = this.props;
      return(
        <form onSubmit={ handleSubmit(this.props.handleImageUpload) }>
          <div className='fileUpload'>
            <label>Upload a profile picture</label>
            <Field name='image' component='input' type='file' accept='image/*' />
          </div>
          <button type='submit' disabled={submitting}>submit</button>
        </form>
      )
    }
 }

 ImageUpload = reduxForm({
   form: 'ImageUploadForm'
 })(ImageUpload);

 export default connect(null, { handleImageUpload })(ImageUpload);
