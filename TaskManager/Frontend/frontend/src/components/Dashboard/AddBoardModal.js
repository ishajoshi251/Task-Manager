import React from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";

const AddBoardModal = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://127.0.0.1:8000/${props.user_name}/addboard`, {
        board_name: e.target.board_name.value,
      })
      .then((response) => response.data)
      .then(
        (result) => {
          alert("Successfully added board");
          props.setupdated(true);
        },
        (error) => {
          alert("Unsuccessfull in adding board");
        }
      );
  };
  return (
    <div className="Container" id="modal">
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="w-100 m-0">Add Board</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center w-100">
          <Row className="d-flex justify-content-center">
            <Col sm={12}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="board_name">
                  <Form.Label className="fs-6 w-100 text-center">
                    Board Name
                  </Form.Label>
                  <div className="board_name_div">
                    <Form.Control
                      type="text"
                      name="board_name"
                      required
                      placeholder=""
                    />
                  </div>
                </Form.Group>
                <Form.Group>
                  <p className="mt-4 w-100 text-center">
                    <Button id="btn-modal" variant="default" type="submit">
                      Submit
                    </Button>
                  </p>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};
export default AddBoardModal;
