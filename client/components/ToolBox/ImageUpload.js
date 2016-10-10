import React, { Component } from 'react';
import { handleImageUpload } from '../../actions/handleImageUpload'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


class ImageUpload extends Component {

  render() {

    const { handleSubmit, submitting } = this.props;

    return(
      <div>
        <form onSubmit={ handleSubmit(this.props.handleImageUpload) }>
          <div className='fileUpload'>
            <label>
              Choose an image.
            </label>
            <Field className="fileInput" name='image' component='input' type='file' accept='image/*' />
          </div>
          <button className='imageUpload-btn btn btn-secondary' type='submit' disabled={submitting} >
            Submit
          </button>
          <p className="error-txt">
            {this.props.msg}
          </p>
        </form>
      </div>
    );
    
  }

}

ImageUpload = reduxForm({
  form: 'ImageUploadForm'
})(ImageUpload);

const mapStateToProps = (state) => {
  return {
    msg: state.userProfile.imageUpload
  }
}

export default connect(mapStateToProps, { handleImageUpload })(ImageUpload);
