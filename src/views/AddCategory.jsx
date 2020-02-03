import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label, FormText, CustomInput } from 'reactstrap';

class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategoryImage: null
    }
  }

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        selectedCategoryImage: URL.createObjectURL(event.target.files[0])
      });
    }
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen}>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" id="title" placeholder="Category Title" required />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="textarea" name="text" id="description" />
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
          <Button type="submit" color="primary">SAVE</Button>{' '}
          <Button color="secondary" onClick={this.props.toggleAddCategory}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddCategory;
