import React, { useEffect, useState } from "react";
import {
  Button, Container, Form, Image, Modal, Row,
  Table, Toast,
  ToastBody, ToastContainer
} from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Sidebar from "../../../common/admin/Sidebar";
import Navbar from "../../../common/client/Navbar";
import AnimalService from "../../../services/AnimalService";
import "./style.css";
export default function AnimalManage() {
  const [animal, setAnimal] = useState([]);
  const [animalSelect, setAnimalSelect] = useState();
  const [fileSelect, setFileSelect] = useState();
  const [isSuccess, setIsSuccess] = useState("");
  useEffect(() => {
    AnimalService.getAllAnimal().then((res) => setAnimal(res.data));
  }, []);
  useEffect(() => {
    fileSelect && setIsSuccess("Đang đọc file");
    fileSelect &&
      AnimalService.readFile(fileSelect)
        .then((res) => {
          if (res === 200) {
            setIsSuccess("Thành công");
          } else setIsSuccess("Thất bại");
        })
        .then(() =>
          setInterval(() => {
            window.location.reload();
          }, 1000)
        );
  }, [fileSelect]);
  return (
    <Container fluid className="m-0 p-0">
      <ToastContainer className="position-fixed" position="bottom-end">
        <Toast
          show={isSuccess !== ""}
          onClose={() => setIsSuccess("")}
          delay={800}
          autohide
        >
          <ToastBody>{isSuccess}</ToastBody>
        </Toast>
      </ToastContainer>
      <Navbar />
      <Container id="content" fluid className="d-flex ml-0">
        <Sidebar />
        <Container fluid>
        <Form.Control
              type="file"
              onChange={(e) => setFileSelect(e.target.files)}
            />
          <Row className="table-content">
            <Table>
              <thead
                className="sticky-top"
                style={{
                  background: "white",
                  borderBottom: "2px black solid",
                  fontWeight: 600,
                }}
              >
                <tr>
                  <td className="text-center">ID</td>
                  <td>Tên khoa học</td>
                  <td>Tên địa phương</td>
                  <td className="text-center">Hình ảnh</td>
                  <td>Phân bố</td>
                  <td>Người thu mẫu</td>
                </tr>
              </thead>
              <tbody>
                {animal ? (
                  animal.map((animals, index) => (
                    <tr
                      onClick={() => setAnimalSelect(animals)}
                      key={index}
                      style={{ cursor: "pointer" }}
                    >
                      <td className="text-center">{animals.id_dong_vat}</td>
                      <td>{animals.ten_khoa_hoc}</td>
                      <td>{animals.ten_dia_phuong}</td>
                      <td className="text-center">
                        <Image
                          src={animals.list_image[0]}
                          height={40}
                          width="auto"
                        />
                      </td>
                      <td>{animals.name_phan_bo}</td>
                      <td>{animals.nguoi_thu_mau}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>
                      <Skeleton />
                    </td>
                    <td>
                      <Skeleton />
                    </td>
                    <td>
                      <Skeleton />
                    </td>
                    <td>
                      <Skeleton />
                    </td>
                    <td>
                      <Skeleton />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Row>
        </Container>
      </Container>
      {animalSelect && (
        <ModalAnimalDetail
          data={animalSelect}
          isShow={animalSelect}
          setShow={() => setAnimalSelect()}
        />
      )}
    </Container>
  );
}
const ModalAnimalDetail = ({ data, isShow, setShow }) => {
  const [imgIndex, setImgIndex] = useState(0);
  return (
    <Modal show={isShow} onHide={setShow} size="md" centered>
      <Modal.Header>Thông tin chi tiết</Modal.Header>
      <Modal.Body>
        <Container className="text-center">
          <Row>
            <Container style={{ width: 400 }}>
              <Row>
                <Image
                  src={data && data.list_image[imgIndex]}
                  className="p-0"
                />
              </Row>
              <Row style={{ paddingTop: 5 }}>
                <Swiper
                  className="p-0"
                  navigation
                  spaceBetween={5}
                  slidesPerView={4}
                  modules={[Navigation]}
                >
                  {data &&
                    data.list_image.map((image, index) => (
                      <SwiperSlide
                        key={index}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Image
                          className="img-fluid p-0"
                          src={image}
                          onClick={() => setImgIndex(index)}
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </Row>
            </Container>
          </Row>
          <Row>
            <FormAnimal data={data} />
          </Row>
        </Container>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button>Cập nhật</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

const FormAnimal = ({ data }) => {
  return (
    <Form>
      <Swiper
        navigation
        slidesPerView={1}
        spaceBetween={8}
        modules={[Navigation]}
        loop
      >
        <SwiperSlide>
          <h4>Tên sinh vật</h4>
          <Form.Group>
            <Form.Label>Tên khoa học</Form.Label>
            <Form.Control placeholder={data.ten_khoa_hoc} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tên tiếng việt</Form.Label>
            <Form.Control placeholder={data.ten_tieng_viet} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tên địa phương</Form.Label>
            <Form.Control placeholder={data.ten_dia_phuong} />
          </Form.Group>
        </SwiperSlide>
        <SwiperSlide>
          <h4>Đặc điểm sinh vật</h4>
          <Form.Group>
            <Form.Label>Bộ</Form.Label>
            <Form.Control placeholder={data.name_bo} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Giới</Form.Label>
            <Form.Control placeholder={data.name_gioi} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Lớp</Form.Label>
            <Form.Control placeholder={data.name_lop} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ngành</Form.Label>
            <Form.Control placeholder={data.name_nganh} />
          </Form.Group>
        </SwiperSlide>
        <SwiperSlide>
          <h4>Phân bố</h4>
          <Form.Group>
            <Form.Label>Phân bố</Form.Label>
            <Form.Control placeholder={data.name_phan_bo} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Địa điểm</Form.Label>
            <Form.Control placeholder={data.dia_diem} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sinh cảnh</Form.Label>
            <Form.Control placeholder={data.name_sinh_canh} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sinh thái</Form.Label>
            <Form.Control as="textarea" placeholder={data.sinh_thai} />
          </Form.Group>
        </SwiperSlide>
      </Swiper>
    </Form>
  );
};
