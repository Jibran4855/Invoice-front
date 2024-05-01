// reactstrap components
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,

} from "reactstrap";

export default function AddCustomerModal(props) {
  return (
    <>
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalHeader closeButton className="bg-light">
          <h4>{props.title}</h4>
        </ModalHeader>
        <ModalBody>
          {props.children}
        </ModalBody>
        <ModalFooter className="justify-content-between p-0">
          <Button color="danger" className="m-0 w-100" onClick={props.hideModal}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
