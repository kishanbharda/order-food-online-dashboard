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
      isSaving: false
    }
  }

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        selectedCategoryImage: URL.createObjectURL(event.target.files[0])
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
    const param = {
      title: this.state.title,
      description: this.state.description,
      image: 'sample.png'
    }
    axios.post(`${apiUrl}/categories`, param).then((res) => {
      console.log(res);
      this.setState({ isSaving: false });
      var options = {
        place: 'tr',
        message: 'Category added successfully !!!',
        type: 'success',
        autoDismiss: 3,
        icon: ''
      };
      this.refs.notify.notificationAlert(options);
      this.props.toggleAddCategory();
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <>
        <Modal isOpen={this.props.isOpen} toggle={this.props.toggleAddCategory}>
          <ModalHeader>Modal title</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title" value={this.state.title} id="title" placeholder="Category Title" required onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" value={this.state.description} id="description" onChange={this.handleInputChange} />
              </FormGroup>
              <FormGroup>
                <Label for="image">Image</Label>
                {
                  this.state.selectedCategoryImage && (
                    <img id="target" style={{marginBottom: 10}} alt="selected_cat_image" src={this.state.selectedCategoryImage}/>
                  )
                }
                <CustomInput type="file" id="image" name="image" label="Select Category Image" onChange={this.onImageChange} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary" onClick={this.saveCategory} disabled={this.state.isSaving}>
              {this.state.isSaving && (<><Spinner color="light" size="sm" />{" "}</>)}
              SAVE
            </Button>{' '}
            <Button color="secondary" onClick={this.props.toggleAddCategory}>Cancel</Button>
          </ModalFooter>
        </Modal>

        {/* Alert */}
        <Notify ref="notify"/>
      </>
    );
  }
}

export default AddCategory;
