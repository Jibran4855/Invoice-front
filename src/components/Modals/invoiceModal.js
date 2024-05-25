// reactstrap components
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,

} from "reactstrap";

export default function InvoiceModal(props) {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {
          props.title && <ModalHeader closeButton className="bg-light">
            <h4>{props.title}</h4>
          </ModalHeader>
        }
        <ModalBody style={{ overflow: "scroll" }}>
          {props.children}
        </ModalBody>
        <ModalFooter className="justify-content-between p-0">
          <Button color="danger" className="m-0 w-100" onClick={props.hideModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
