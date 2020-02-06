import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label, FormText, CustomInput } from 'reactstrap';
import Notify from 'react-notification-alert';
import { Spinner } from 'reactstrap';
import axios from 'axios';
import { apiUrl } from '../config/database';

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      selectedCategoryImage: null,
      isSaving: false,
      formError: '',
      categoryId: ''
    }
  }

  componentWillReceiveProps = () => {
    if (this.props.categoryToUpdate) {
      const { title = "", description = "", image = null, _id = '' } = this.props.categoryToUpdate;
      this.setState({
        title,
        description,
        selectedCategoryImage: image,
        categoryId: _id
      });
    } else {
      this.setState({
        title: '',
        description: '',
        selectedCategoryImage: null,
        categoryId: ''
      });
    }
  }

  showSuccess = (msg) => {
    const options = {
      place: 'tr',
      message: msg,
      type: 'success',
      autoDismiss: 3,
      icon: ''
    };
    this.refs.notify.notificationAlert(options);
  }

  showError = (err) => {
    const options = {
      place: 'tr',
      message: err,
      type: 'danger',
      autoDismiss: 3,
      icon: ''
    };
    this.refs.notify.notificationAlert(options);
  }

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        selectedCategoryImage: event.target.files[0]
      });
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  saveCategory = () => {
    this.setState({ isSaving: true });
    const body = new FormData();
    body.append('image', this.state.selectedCategoryImage);
    body.append('title', this.state.title);
    body.append('description', this.state.description);
    axios.post(`${apiUrl}/categories`, body ).then((res) => {
      this.setState({ isSaving: false });
      if (res.data.success) {
        this.props.toggleAddCategory(true, res.data.data);
        this.showSuccess(res.data.message);
        setTimeout(() => {
          this.resetForm();
        }, 1000);
      } else {
        this.setState({ formError: res.data.message });
      }
    }).catch((err) => {
      this.setState({ isSaving: false });
      this.showError(err.message);
      console.log(err.message);
      this.props.toggleAddCategory(false, []);
    });
  }

  resetForm = () => {
    this.setState({
      title: '',
      description: '',
      selectedCategoryImage: null
    });
  }

  updateCategory = () => {
    this.setState({ isSaving: true });
    const body = new FormData();
    body.append('image', this.state.selectedCategoryImage);
    body.append('title', this.state.title);
    body.append('description', this.state.description);
    console.log(body);
    console.log(this.state.selectedCategoryImage);
    axios.put(`${apiUrl}/categories/${this.state.categoryId}`, body).then((res) => {
      console.log(res);
      this.setState({ isSaving: false });
      if (res.data.success) {
        this.props.toggleAddCategory(true, res.data.data);
        this.showSuccess(res.data.message);
        setTimeout(() => {
          this.resetForm();
        }, 1000);
      } else {
        this.setState({ formError: res.data.message });
      }
    }).catch((err) => {
      this.setState({ isSaving: false });
      this.showError(err.message);
      console.log(err.message);
      this.props.toggleAddCategory(false, []);
    });
  }

  render() {
    return (
      <>
        <Modal isOpen={this.props.isOpen} unmountOnClose={true}>
          <ModalHeader>Modal title</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Title<span className="text-danger">*</span></Label>
                <Input type="text" name="title" value={this.state.title} id="title" placeholder="Category Title" required onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" value={this.state.description} id="description" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="image">Image</Label>
                {
                  this.state.categoryId ? (
                    <img id="target" style={{marginBottom: 10}} alt="selected_cat_image" src={this.state.selectedCategoryImage}/>
                  ) : (
                    <img id="target" style={{marginBottom: 10}} alt="selected_cat_image" src={URL.createObjectURL(this.state.selectedCategoryImage)}/>
                  )
                }
                {
                  this.state.selectedCategoryImage && (
                    <img id="target" style={{marginBottom: 10}} alt="selected_cat_image" src={this.state.selectedCategoryImage || URL.createObjectURL(this.state.selectedCategoryImage)}/>
                  )
                }
                <CustomInput type="file" id="image" name="image" label="Select Category Image" onChange={this.onImageChange} />
              </FormGroup>
              {
                this.state.formError && (
                  <p className="text-danger" >
                    {this.state.formError}
                  </p>
                )
              }
            </Form>
          </ModalBody>
          <ModalFooter>
            {
              this.state.categoryId ? (
                <Button type="submit" color="primary" onClick={this.updateCategory} disabled={this.state.isSaving || !this.state.title}>
                  {this.state.isSaving && (<><Spinner color="light" size="sm" />{" "}</>)}
                  UPDATE
                </Button>
              ) : (
                <Button type="submit" color="primary" onClick={this.saveCategory} disabled={this.state.isSaving || !this.state.title}>
                  {this.state.isSaving && (<><Spinner color="light" size="sm" />{" "}</>)}
                  SAVE
                </Button>
              )
            }
            {" "}
            <Button color="secondary" onClick={() => this.props.toggleAddCategory(false, [])}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* Alert */}
        <Notify ref="notify"/>
      </>
    );
  }
}

export default AddCategory;
