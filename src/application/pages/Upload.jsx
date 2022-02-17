import React, { useRef, useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import { useRecoilValue } from "recoil";
import { categoryListState } from "../abstract/EventContext";
import { API } from "../../static/API";

const fileUpload = (e, target, formik) => {
  if (e.target.files[0] !== null && e.target.files[0] !== undefined) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = () => {
      target.value = fileReader.result;
      formik.values.image_path = fileReader.result;
    };
    fileReader.onerror = () => {
      target.value = null;
    };
  }
};

const Upload = () => {
  const categories = useRecoilValue(categoryListState);
  const imagePath = useRef("");
  const [message, setMessage] = useState(false);
  const [errors, setErrors] = useState({});
  const [displayErrors, setDisplayErrors] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Required";
    }

    if (!values.date) {
      errors.date = "Required";
    }

    if (!values.description) {
      errors.description = "Required";
    }

    if (!values.image_path) {
      errors.image_path = "Required";
    }

    if (!values.category_id) {
      errors.category_id = "Required";
    }

    if (!values.phone) {
      errors.phone = "Required";
    } else if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/i.test(
        values.phone
      )
    ) {
      errors.phone = "Invalid phone number";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.place) {
      errors.place = "Required";
    }

    setErrors(() => {
      return errors;
    });

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
      description: "",
      image_path: "",
      category_id: null,
      phone: "",
      email: "",
      place: "",
    },
    validate,
    onSubmit: (values) => {
      const result = values;
      result.date = Date.parse(result.date) / 1000;

      fetch(`${API.url}/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((result) => {
          if (result.ok) {
            setMessage(() => {
              return "Your event has been uploaded!";
            });
            formik.resetForm();
          } else {
            if (result.status === 413) {
              throw new Error("Image size is too large!");
            }
            throw new Error("Failed to post the data!");
          }
        })
        .catch((err) => {
          setMessage(() => {
            return err.message;
          });
        });
    },
  });

  console.log(errors);

  return (
    <Container className="my-4">
      <section>
        <h1 className="h2 fw-bold mb-4">Add an event</h1>
        {message && <Alert>{message}</Alert>}
        <Form
          onSubmit={(e) => {
            formik.handleSubmit(e);

            setDisplayErrors(() => {
              return true;
            });
          }}
        >
          <Row>
            <Col sm={6} md={4}>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="title"
                  name="title"
                  placeholder="Enter the title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
                {errors.title && displayErrors && (
                  <Form.Text className="text-danger">{errors.title}</Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col sm={6} md={4}>
              <Form.Group className="mb-3" controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  placeholder="Enter the date"
                  onChange={formik.handleChange}
                  value={formik.values.date}
                />
                {errors.date && displayErrors && (
                  <Form.Text className="text-danger">{errors.date}</Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col sm={6} md={4}>
              <Form.Group className="mb-3" controlId="category_id">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category_id"
                  onChange={formik.handleChange}
                  value={formik.values.category_id}
                >
                  <option disabled selected>
                    Select...
                  </option>
                  {categories.map((item) => {
                    return (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </Form.Select>
                {errors.category_id && displayErrors && (
                  <Form.Text className="text-danger">
                    {errors.category_id}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  name="description"
                  placeholder="Enter the description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
                {errors.description && displayErrors && (
                  <Form.Text className="text-danger">
                    {errors.description}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6} md={4}>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter the phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                {errors.phone && displayErrors && (
                  <Form.Text className="text-danger">{errors.phone}</Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col sm={6} md={4}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>E-mail address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter the e-mail address"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {errors.email && displayErrors && (
                  <Form.Text className="text-danger">{errors.email}</Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col sm={6} md={4}>
              <Form.Group className="mb-3" controlId="place">
                <Form.Label>Place</Form.Label>
                <Form.Control
                  type="text"
                  name="place"
                  placeholder="Enter the place"
                  onChange={formik.handleChange}
                  value={formik.values.place}
                />
                {errors.place && displayErrors && (
                  <Form.Text className="text-danger">{errors.place}</Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="image_path">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="hidden"
                  name="image_path"
                  ref={imagePath}
                  value={formik.values.image_path}
                  onChange={formik.handleChange}
                />
                <Form.Control
                  type="file"
                  name="image"
                  placeholder="Upload an image"
                  onChange={(e) => {
                    fileUpload(e, imagePath.current, formik);
                  }}
                />
                {errors.place && displayErrors && (
                  <Form.Text className="text-danger">
                    {errors.image_path}
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col className="text-end">
              <Button
                variant="secondary"
                type="reset"
                onClick={formik.resetForm}
              >
                Reset
              </Button>
              <Button variant="primary" type="submit" className="ms-2">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </section>
    </Container>
  );
};

export default Upload;
