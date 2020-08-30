import React from "react";
import { Modal, Button } from "react-bootstrap";
import { ISubmission } from "../graphql-types";

interface Props {
  show: boolean;
  handleClose: Function;
  submissions: ISubmission[] | null;
}

const PreviewModal: React.FC<Props> = ({ show, handleClose, submissions }) => {
  return (
    <div>
      {submissions && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Submission</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {submissions.map((submission) => (
              <div className="d-flex">
                <span>
                  <b>
                    {submission.question.text}
                    {": "}
                  </b>
                  {submission.answer?.text || submission.answerText}
                </span>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default PreviewModal;
