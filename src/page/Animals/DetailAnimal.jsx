import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../../common/client/Navbar";
import AnimalService from "../../services/AnimalService";
import "./style.css";
export default function DetailAnimal() {
  const [animal, setAnimal] = useState(null);
  const [animalSame, setAnimalSame] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    AnimalService.getDetailAnimal(id).then((res) => setAnimal(res));
  }, [id]);
  useEffect(() => {
    AnimalService.getAllAnimal().then((res) => {
      const newList =
        res.data.length > 0
          ? res.data
              .filter(
                (e) =>
                  e.name_ho === animal.name_ho &&
                  e.id_dong_vat !== animal.id_dong_vat
              )
              .slice(0, 5)
          : [];
      setAnimalSame(newList);
    });
  }, [animal]);
  // console.log(animalSame);
  return (
    <>
      <Navbar />
      <Container id="detail-product" className="d-flex">
        <Container
          className="img-product"
          style={{ width: 500, height: "auto" }}
        >
          <Image
            className="img-fluid"
            src={animal && animal.list_image[imgIndex]}
          />
          <div className="list_image-product gap-2 d-flex grow-4 py-2">
            <Swiper
              navigation
              spaceBetween={5}
              slidesPerView={4}
              modules={[Navigation]}
            >
              {animal &&
                animal.list_image.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div className="img">
                      <Image
                        className="img-fluid"
                        src={image}
                        onClick={() => setImgIndex(index)}
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </Container>
        <Container style={{boxShadow: 'rgb(231 231 231 / 80%) 0px 4px 12px', padding: "16px"}}>
          <span
            className="name-animal"
            style={{ fontWeight: 700, fontSize: "larger" }}
          >
            {animal ? animal.ten_tieng_viet : <Skeleton width={100} />}
            <div
              className="d-flex flex-column gap-2"
              style={{ fontWeight: 500, fontSize: "normal", padding: 0 }}
            >
              {animal ? (
                <span>Tên khoa học: {animal.ten_khoa_hoc}</span>
              ) : (
                <Skeleton width={130} />
              )}
              {animal ? (
                <span>Tên địa phương: {animal.ten_dia_phuong}</span>
              ) : (
                <Skeleton width={130} />
              )}
            </div>
          </span>
          <div
            className="category-animal"
            style={{border: '1px solid #111', padding: "10px"}}
          >
            <h6>Bộ: {animal ? animal.name_bo : <Skeleton width={130} />}</h6>
            <h6>
              Giới: {animal ? animal.name_gioi : <Skeleton width={130} />}
            </h6>
            <h6>Lớp: {animal ? animal.name_lop : <Skeleton width={130} />}</h6>
            <h6>
              Ngành: {animal ? animal.name_nganh : <Skeleton width={130} />}
            </h6>
          </div>
          <h5 class="mt-3">Mô tả:</h5>
          <div className="hinhthai-animal" style={{border: '1px solid #111', padding: "10px"}}>
            <p
              style={{
                textAlign: "justify",
                maxHeight: 300,
                overflowY: "auto",
              }}
            >
              {animal ? animal.hinh_thai : <Skeleton count={6} />}
            </p>
          </div>
        </Container>
      </Container>
      <Container style={{ padding: "16px", boxShadow: 'rgb(231 231 231 / 80%) 0px 4px 12px' }}>

            <div className="d-flex flex-column">
              <span>
                <span style={{ fontWeight: 600 }}>Tình trạng bảo tồn: </span>{" "}
                {animal ? (
                  animal.name_tinh_trang_bao_ton
                ) : (
                  <Skeleton width={130} />
                )}
              </span>
              <span>
                <span style={{ fontWeight: 600 }}>Tình trạng mẫu vật: </span>{" "}
                {animal ? (
                  animal.name_tinh_trang_mau_vat
                ) : (
                  <Skeleton width={120} />
                )}
              </span>
            </div>
            <div className="nguoi--thu-mau d-flex flex-column">
              <span>
                <span style={{ fontWeight: 600 }}> Người thu mẫu: </span>
                {animal ? animal.nguoi_thu_mau : <Skeleton />}
              </span>
              <span>
                <span style={{ fontWeight: 600 }}>Ngày thu mẫu: </span>{" "}
                {animal ? (
                  new Date(animal.ngay_thu_mau).toLocaleDateString()
                ) : (
                  <Skeleton />
                )}
              </span>
            </div>
        <Row>
          <Col>
            <span style={{ fontWeight: 600 }}>Giá trị: </span>{" "}
            {animal ? animal.name_giai_tri : <Skeleton />}
          </Col>
        </Row>
        <Row>
          <Col>
            <span style={{ fontWeight: 600 }}>Phân bố:</span>{" "}
            {animal ? animal.name_phan_bo : <Skeleton />}
          </Col>
        </Row>
        <Row>
          <Col>
            <span style={{ fontWeight: 600 }}>Địa điểm: </span>{" "}
            {animal ? animal.dia_diem : <Skeleton />}
          </Col>
        </Row>{" "}
        <Row>
          <Col>
            <span style={{ fontWeight: 600 }}>Sinh cảnh: </span>{" "}
            {animal ? animal.name_sinh_canh : <Skeleton />}
          </Col>
        </Row>
        <Row>
          <span style={{ fontWeight: 600 }}>Sinh thái: </span>
          <span>{animal ? animal.sinh_thai : <Skeleton />}</span>
        </Row>
      </Container>
      <Container className="mt-4" style={{ padding: "16px", boxShadow: 'rgb(231 231 231 / 80%) 0px 4px 12px' }}>
        <h4 className="my-3 text-center">Sinh vật cùng họ</h4>
        <Swiper
          navigation
          spaceBetween={5}
          slidesPerView={4}
          modules={[Navigation]}
        >
          {animalSame &&
            animalSame.map((image, index) => (
              <SwiperSlide
                key={index}
                onClick={() =>
                  (window.location = `/animal/detail/id_animal=${image.id_dong_vat}`)
                }
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="img">
                  <Image
                    className="img-fluid"
                    src={image.list_image[0]}
                    onClick={() => setImgIndex(index)}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </>
  );
}
