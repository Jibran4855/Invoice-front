import { useState, useEffect } from "react";

// reactstrap components
import { Card, CardHeader, Container, Row } from "reactstrap";

import UserHeader from "components/Headers/UserHeader";
import ProductsTable from "../../components/tables/productsTable";
import AddProductModal from "../../components/Modals/addProductModal";
import { ProductServices } from "services/products";
import { useDispatch } from "react-redux";
import { setLoader } from "../../store/loader";
import { setError, setSuccess } from "../../store/alert";
import confirm from "reactstrap-confirm";

const Services = (props) => {
  const [services, setServices] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);

  const [productData, setProductData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts();
  }, []);

  const openUpdateModal = async (data) => {
    setProductData(data);
    setShowAddModal(true);
  };

  const getAllProducts = async () => {
    try {
      dispatch(setLoader(true));
      const response = await ProductServices.getAllProducts();
      setServices(response.data);
      dispatch(setLoader(false));
    } catch (e) {
      console.log({ e });
      dispatch(setLoader(false));
      dispatch(setError(e.data.error));
    }
  };

  const createProduct = async (data) => {
    try {
      dispatch(setLoader(true));
      const response = await ProductServices.create(data);
      dispatch(setLoader(false));
      dispatch(setSuccess(response.message));
      setShowAddModal(false)
      getAllProducts();
    } catch (e) {
      console.log({ e });
      dispatch(setLoader(false));
      dispatch(setError(e.data.error));
    }
  };

  const updateProduct = async (data) => {
    try {
      dispatch(setLoader(true));
      const response = await ProductServices.update(data);
      dispatch(setSuccess(response.message));
      dispatch(setLoader(false));
      setShowAddModal(false);
      getAllProducts();
    } catch (e) {
      console.log({ e });
      dispatch(setLoader(false));
      dispatch(setError(e.data.error));
    }
  };

  const deleteProduct = async (id) => {
    try {
      let confirmation = await confirm({
        title: "",
        message:
          "! Are you sure you want to delete this ? Because this action cannot be undone'",
        confirmText: "DELETE",
        confirmColor: "danger",
        cancelColor: "link text-primary",
      });

      if (!confirmation) return false;

      const response = await ProductServices.delete(id);
      dispatch(setSuccess(response.message));
      dispatch(setLoader(false));
      getAllProducts();
    } catch (e) {
      console.log({ e });
      dispatch(setLoader(false));
      dispatch(setError(e.data.error));
    }
  };

  const handleProductCreateAndUpdate = (operation, data) => {

    switch (operation) {
      case 'create':
        createProduct(data);
        break;
      case 'update':
        updateProduct(data);
        break;
      default:
        break;
    }
  }

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="justify-content-between ">
                  <h3 className="mb-0">Product List</h3>
                  <AddProductModal
                    showAddModal={showAddModal}
                    setShowAddModal={setShowAddModal}
                    productData={productData}
                    setProductData={setProductData}
                    handleCreateAndUpdate={handleProductCreateAndUpdate}
                  />
                </Row>
              </CardHeader>

              <ProductsTable
                data={services}
                openUpdateModal={openUpdateModal}
                delete={deleteProduct}
              />

            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Services;
