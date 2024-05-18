import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";
import { DashboardServices } from "services/dashboard";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "store/loader";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user)

  const [activeNav, setActiveNav] = useState(1);
  const [count, setCounts] = useState(false);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [salesGraphData, setSalesGraphData] = useState({});
  const [invoiceGraphData, setInvoiceGraphData] = useState({});


  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };

  const getAllHeaderCount = async () => {
    dispatch(setLoader(true));
    try {
      const response = await DashboardServices.getAllCount();
      setCounts(response.data);

      setSalesGraphData({
        labels: response.data.salesGraph.labels,
        datasets: [
          {
            label: "Performance",
            data: response.data.salesGraph.data,
          },
        ],
      })

      setInvoiceGraphData({
        labels: response.data.totalInvoiceGraph.labels,
        datasets: [
          {
            label: "Performance",
            data: response.data.totalInvoiceGraph.data,
          },
        ],
      })
      dispatch(setLoader(false));
    } catch (e) {
      console.log({ e });
    }
  };

  useEffect(() => {
    getAllHeaderCount();
    // let data = chartExample1['data1']();
  }, []);

  // useEffect(async () => {
    // if (!currentUser) {
      // let authUser = await AuthServices.getAuthUser();
      // dispatch(setUser(authUser.data));
  //   }
  // }, []);

  return (
    <>
      <Header allCounts={count} user={currentUser} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5" xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  {/* <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={(e) => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div> */}
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={salesGraphData}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="12">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="text-white mb-0">Total Invoices</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
                    data={invoiceGraphData}
                    options={chartExample2.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
