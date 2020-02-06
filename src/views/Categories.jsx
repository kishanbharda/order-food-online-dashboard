import React from "react";
import { Card, CardHeader, CardBody, CardTitle, Row, Col, Table, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from "reactstrap";
import axios from 'axios';
import Notify from 'react-notification-alert';
import { Spinner } from 'reactstrap';
import { apiUrl } from '../config/database';
import AddCategory from './AddCategory';

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAddCategory: false,
      isLoading: true,
      categories: [],
      deleting: '',
      categoryFetchError: '',
      categoryToUpdate: null
    }
  }

  componentDidMount = () => {
    this.fetchCategories();
  }

  fetchCategories = () => {
    axios.get(`${apiUrl}/categories`).then((res) => {
      if (res.data.success) {
        this.setState({ categories: res.data.data, isLoading: false });
      } else {
        this.setState({ categories: res.data.data, isLoading: false, categoryFetchError: res.data.message });
      }
    }).catch((err) => {
      this.setState({ isLoading: false });
    });
  }

  toggleAddCategory = (isAdded, data) => {
    this.setState({ displayAddCategory: !this.state.displayAddCategory })
    if (isAdded) {
      this.fetchCategories();
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

  deleteCategory = (categoryId, index) => {
    this.setState({ deleting: categoryId });
    axios.delete(`${apiUrl}/categories/${categoryId}`).then((res) => {
      if (res.data.success) {
        const categories = this.state.categories;
        categories.splice(index, 1);
        this.setState({ categories });
        this.showSuccess(res.data.message);
      } else {
        this.setState({ deleting: ''});
        this.showError(res.data.message);
      }
    }).catch((err) => {
      console.log(err);
      this.setState({ deleting: '' });
    });
  }

  updateCategory = (categoryToUpdate) => {
    this.setState({ categoryToUpdate }, () => {
      this.toggleAddCategory(false, []);
    });
  }

  addCategory = () => {
    this.setState({ categoryToUpdate: null }, () => {
      this.toggleAddCategory(false, [])
    });
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle className="d-flex align-items-center justify-content-between">
                    <h3 style={{margin: 0}}>Categories</h3>
                    <Button color="primary" outline size="sm" pullRight onClick={() => this.addCategory()}>
                      <i className="fa fa-plus" />{" "}
                      add
                    </Button>
                  </CardTitle>
                  <form>
                    <InputGroup className="no-border">
                      <Input placeholder="Search..." />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="nc-icon nc-zoom-split" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </form>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <th>
                        Image
                      </th>
                      <th>
                        Title
                      </th>
                      <th>
                        Description
                      </th>
                      <th className="text-right">
                        Action
                      </th>
                    </thead>
                    <tbody>
                      {
                        this.state.categories.map((item, index) => (
                          <tr key={item._id}>
                            <td>
                              <img src={item.image ? item.image : require('../assets/img/image_placeholder.png')} height={100} width={100} alt="category_image" />
                            </td>
                            <td>
                              {item.title}
                            </td>
                            <td>
                              {item.description}
                            </td>
                            <td className="text-right">
                              <Button 
                                color="primary"
                                onClick={() => this.updateCategory(item)}
                              >
                                <i className="fas fa-pencil-alt" aria-hidden="true"></i>
                              </Button>
                              {" "}
                              <Button 
                                color="danger" 
                                onClick={() => this.deleteCategory(item._id, index)}
                                disabled={this.state.deleting === item._id}
                              >
                                {
                                  this.state.deleting === item._id ? (
                                    <Spinner color="light" size="sm"/>
                                  ) : (
                                    <i className="fas fa-trash-alt" size="sm" aria-hidden="true"></i>
                                  )
                                }
                              </Button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                  {
                    this.state.isLoading && (
                      <div className="text-center">
                        <Spinner type="grow" color="primary" />
                      </div>
                    )
                  }
                  {
                    this.state.categoryFetchError && (
                      <div className="text-center">
                        <p className="text-danger">{this.state.categoryFetchError}</p>
                      </div>
                    )
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
          <AddCategory 
            categoryToUpdate={this.state.categoryToUpdate} 
            isOpen={this.state.displayAddCategory} 
            toggleAddCategory={(isAdded, data) => this.toggleAddCategory(isAdded, data)} 
          />
          <Notify ref="notify"/>
        </div>
      </>
    );
  }
}

export default Categories;
