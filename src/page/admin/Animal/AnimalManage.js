import React, { useEffect, useState } from "react";
import {
  Button, Container, Form, Image, Modal, Row,
  Table, Toast,
  ToastBody, ToastContainer
} from "react-bootstrap";

import Swal from 'sweetalert2'
import axios from "axios";

import Skeleton from "react-loading-skeleton";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Sidebar from "../../../common/admin/Sidebar";
import Navbar from "../../../common/client/Navbar";

import AnimalService from "../../../services/AnimalService";
import GioiService from "../../../services/GioiService";
import NganhService from "../../../services/NganhService";
import LopService from "../../../services/LopService";
import BoService from "../../../services/BoService";
import HoService from "../../../services/HoService";
import OtherService from "../../../services/OtherService";

import "./style.css";
import { faHouseMedicalCircleExclamation } from "@fortawesome/free-solid-svg-icons";
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
          <div>Nhập liệu file excel: </div>
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

  const [gioi, setGioi] = useState([]);
  const [nganh, setNganh] = useState([]);
  const [lop, setLop] = useState([]);
  const [bo, setBo] = useState([]);
  const [ho, setHo] = useState([]);

  const [phanBo, setPhanBo] = useState([]);
  const [sinhCanh, setSinhCanh] = useState([]);
  const [giaTri, setGiaTri] = useState([]);
  const [ttMauVat, setTTMauVat] = useState([]);
  const [ttBaoTon, setTTBaoTon] = useState([]);

  const [input, setInput] = useState({
    ten_khoa_hoc: data.ten_khoa_hoc,
    ten_tieng_viet: data.ten_tieng_viet,
    ten_dia_phuong: data.ten_dia_phuong,
    ngay_thu_mau: data.ngay_thu_mau,
    dia_diem: data.dia_diem,
    nguoi_thu_mau: data.nguoi_thu_mau,
    hinh_thai: data.hinh_thai,
    sinh_thai: data.sinh_thai
  });

  useEffect(() => {
    GioiService.getGioi().then((res) => setGioi(res));
    NganhService.getNganh().then((res) => setNganh(res));
    LopService.getLop().then((res) => setLop(res));
    BoService.getBo().then((res) => setBo(res));
    HoService.getHo().then((res) => setHo(res));

    OtherService.getSinhCanh().then((res) => setSinhCanh(res));
    OtherService.getPhanBo().then((res) => setPhanBo(res));
    OtherService.getGiaTri().then((res) => setGiaTri(res));
    OtherService.ttMauVat().then((res) => setTTMauVat(res));
    OtherService.ttBaoTon().then((res) => setTTBaoTon(res));
  }, []);

  const submitEditAnimal = (e) => {
    e.preventDefault()

    var formData = new FormData(document.getElementById('frmEditAnimal'));

    axios.put('http://localhost:8000/dong-vat/', formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        console.log(res);
        Swal.fire(
          'Update!',
          'Cập nhật thành công',
          'success'
        )
      }).catch(err => {
        console.log(err)

        Swal.fire(
          'Fail!',
          'Cập nhật thất bại',
          'error'
        )
      })
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setInput({
      ...input,
      [evt.target.name]: value
    });
  }

  const deleteAnimal = (id_dong_vat) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Bạn sẽ xóa vĩnh viễn động vật này",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete('http://localhost:8000/dong-vat/?id_dong_vat='+id_dong_vat)
          .then(res => {
            console.log(res);
            Swal.fire(
              'Deleted!',
              'Xóa thành công',
              'success'
            )
            window.location.reload();
          }).catch(err => {
            console.log(err)

            Swal.fire(
              'Fail!',
              'Xóa thất bại',
              'error'
            )
          })
      }
    })
  }

  return (
    <Form id="frmEditAnimal" onSubmit={submitEditAnimal}>
      <Swiper
        navigation
        slidesPerView={1}
        spaceBetween={8}
        modules={[Navigation]}
        loop
      >
        {/* Ten Sinh Vat */}
        <Form.Control type="hidden" name="id_dong_vat" value={data.id_dong_vat} />
        <Form.Control type="hidden" name="id_user" value={'1'} />
        <SwiperSlide>
          <h4>Thông tin</h4>
          <Form.Group>
            <Form.Label>Tên khoa học</Form.Label>
            <Form.Control name="ten_khoa_hoc" required value={data.ten_khoa_hoc && input.ten_khoa_hoc} placeholder={data.ten_khoa_hoc} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tên tiếng việt</Form.Label>
            <Form.Control name="ten_tieng_viet" required value={data.ten_tieng_viet && input.ten_tieng_viet} placeholder={data.ten_tieng_viet} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tên địa phương</Form.Label>
            <Form.Control name="ten_dia_phuong" required value={data.ten_dia_phuong && input.ten_dia_phuong} placeholder={data.ten_dia_phuong} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Địa điểm</Form.Label>
            <Form.Control name="dia_diem" required value={data.dia_diem && input.dia_diem} placeholder={data.dia_diem} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Ngày thu mẫu</Form.Label>
            <Form.Control type="datetime-local" name="ngay_thu_mau" required value={input.ngay_thu_mau ? input.ngay_thu_mau : data.ngay_thu_mau} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Người thu mẫu</Form.Label>
            <Form.Control name="nguoi_thu_mau" required value={data.nguoi_thu_mau && input.nguoi_thu_mau} placeholder={data.nguoi_thu_mau} />
          </Form.Group>
        </SwiperSlide>

        {/* Dac Diem */}
        <SwiperSlide>
          <h4>Thông tin</h4>
          <Form.Group>
            <Form.Label>Giới</Form.Label>
            <Form.Select name="id_gioi" >
              {gioi ? gioi.map(gioi => {
                if (data.name_gioi == gioi.name) {
                  return <option value={gioi.id_gioi} selected>{gioi.name}</option>
                } else {
                  return <option value={gioi.id_gioi}>{gioi.name}</option>
                }
              }
              ) : null}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Ngành</Form.Label>
            <Form.Select name="id_nganh" >
              {nganh && nganh.map(nganh => {
                if (data.name_nganh == nganh.name) {
                  return <option value={nganh.id_nganh} selected>{nganh.name}</option>
                } else {
                  return <option key={'nganh-' + nganh.id_nganh} value={nganh.id_nganh}>{nganh.name}</option>
                }
              }
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Lớp</Form.Label>
            <Form.Select name="id_lop" >
              {lop && lop.map(lop => {
                if (data.name_lop == lop.name) {
                  return <option value={lop.id_lop} selected>{lop.name}</option>
                } else {
                  return <option key={'lop-' + lop.id_lop} value={lop.id_lop}>{lop.name}</option>
                }
              }
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Bộ</Form.Label>
            <Form.Select name="id_bo" >
              {bo && bo.map(bo => {
                if (data.name_bo == bo.name) {
                  return <option value={bo.id_bo} selected>{bo.name}</option>
                } else {
                  return <option key={'bo-' + bo.id_bo} value={bo.id_bo}>{bo.name}</option>
                }
              }
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Họ</Form.Label>
            <Form.Select name="id_ho" >
              {ho && ho.map(ho => {
                if (data.name_ho == ho.name) {
                  return <option value={ho.id_ho} selected>{ho.name}</option>
                } else {
                  return <option key={'ho-' + ho.id_ho} value={ho.id_ho}>{ho.name}</option>
                }
              }
              )}
            </Form.Select>
          </Form.Group>
        </SwiperSlide>

        {/* Phan Bo */}
        <SwiperSlide>
          <h4>Thông tin</h4>
          <Form.Group>
            <Form.Label>Phân bố</Form.Label>
            <Form.Select name="id_phan_bo" >
              {phanBo && phanBo.map(phanBo => {
                if (data.name_phan_bo == phanBo.name) {
                  return <option value={phanBo.id_phan_bo} selected>{phanBo.name}</option>
                } else {
                  return <option key={'phanbo-' + phanBo.id_phan_bo} value={phanBo.id_phan_bo}>{phanBo.name}</option>
                }
              }
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tình trạng mẫu vật</Form.Label>
            <Form.Select name="id_tinh_trang_mau_vat" >
              {ttMauVat && ttMauVat.map(ttMauVat => {
                if (data.name_tinh_trang_mau_vat == ttMauVat.name) {
                  return <option value={ttMauVat.id_tinh_trang_mau_vat} selected>{ttMauVat.name}</option>
                } else {
                  return <option key={'ttMauVat-' + ttMauVat.id_tinh_trang_mau_vat} value={ttMauVat.id_tinh_trang_mau_vat}>{ttMauVat.name}</option>
                }
              }
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Tình trạng bảo tồn</Form.Label>
            <Form.Select name="id_tinh_trang_bao_ton" >
              {ttBaoTon && ttBaoTon.map(ttBaoTon => {
                if (data.name_tinh_trang_bao_ton == ttBaoTon.name) {
                  return <option value={ttBaoTon.id_tinh_trang_bao_ton} selected>{ttBaoTon.name}</option>
                } else {
                  return <option key={'ttBaoTon-' + ttBaoTon.id_tinh_trang_bao_ton} value={ttBaoTon.id_tinh_trang_bao_ton}>{ttBaoTon.name}</option>
                }
              }
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Sinh cảnh</Form.Label>
            <Form.Select name="id_sinh_canh" >
              {sinhCanh && sinhCanh.map(sinhCanh => {
                if (data.name_sinh_canh == sinhCanh.name) {
                  return <option value={sinhCanh.id_sinh_canh} selected>{sinhCanh.name}</option>
                } else {
                  return <option key={'sinhCanh-' + sinhCanh.id_sinh_canh} value={sinhCanh.id_sinh_canh}>{sinhCanh.name}</option>
                }
              }
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Giá trị</Form.Label>
            <Form.Select name="id_gia_tri" >
              {sinhCanh && giaTri.map(giaTri => {
                if (data.name_gia_tri == giaTri.name) {
                  return <option value={giaTri.id_gia_tri} selected>{giaTri.name}</option>
                } else {
                  return <option key={'giaTri-' + giaTri.id_gia_tri} value={giaTri.id_gia_tri}>{giaTri.name}</option>
                }
              }
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Hình thái</Form.Label>
            <Form.Control name="hinh_thai" as="textarea" required value={data.hinh_thai && input.hinh_thai} placeholder={data.hinh_thai} onChange={handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sinh thái</Form.Label>
            <Form.Control name="sinh_thai" as="textarea" required value={data.sinh_thai && input.sinh_thai} placeholder={data.sinh_thai} onChange={handleChange} />
          </Form.Group>
        </SwiperSlide>
        <Button type="submit" form="frmEditAnimal">Lưu</Button>
        <Button class="ms-3" onClick={() => deleteAnimal(data.id_dong_vat)} variant="danger">Xóa</Button>
      </Swiper>
    </Form>
  );
};
