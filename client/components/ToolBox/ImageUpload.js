import React, { Component } from 'react';
import { handleImageUpload, resetError } from '../../actions/handleImageUpload'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';


class ImageUpload extends Component {

  componentWillUnmount() {
    this.props.resetError();
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return(
      <div>
        <form onSubmit={ handleSubmit(this.props.handleImageUpload) }>
          <div className='fileUpload'>
            <label>Upload an image.</label>
            <Field className="fileInput" name='image' component='input' type='file' accept='image/*' />
          </div>
          <button className='imageUpload-btn btn btn-secondary' type='submit' disabled={submitting} >Submit</button>
          <p className="error-txt">{this.props.msg}</p>
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

export default connect(mapStateToProps, { handleImageUpload, resetError })(ImageUpload);
