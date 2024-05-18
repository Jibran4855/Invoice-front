
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row } from "reactstrap";
import UserHeader from "components/Headers/UserHeader";

const RightContent = (props) => {
  return (
    <>
      <UserHeader />
      <Container className="mt--7" fluid id={props?.id}>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="justify-content-between ">
                  <h3 className="mb-0">{props?.title}</h3>
                </Row>
              </CardHeader>
              <CardBody>
                {props.children}
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default RightContent;
