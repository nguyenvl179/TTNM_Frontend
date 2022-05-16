import React, { useEffect, useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Gioi from "../../services/GioiService";
import Nganh from "../../services/NganhService";
import Lop from "../../services/LopService";
import Bo from "../../services/BoService";
import Ho from "../../services/HoService";
import "./style.css";
export default function Sidebar({ handleSelect, filter, searchText, setSearchText }) {
  const [gioi, setGioi] = useState([]);
  const [nganh, setNganh] = useState([]);
  const [lop, setLop] = useState([]);
  const [bo, setBo] = useState([]);
  const [ho, setHo] = useState([]);

  useEffect(() => {
    Gioi.getGioi().then((res) => setGioi(res));
    Nganh.getNganh().then((res) => setNganh(res));
    Lop.getLop().then((res) => setLop(res));
    Bo.getBo().then((res) => setBo(res));
    Ho.getHo().then((res) => setHo(res));
  }, []);

  return (
    <>
    <Form.Group id="client-sidebar" className="client-sidebar d-flex align-items-center position-relative">
      <Form.Label
        className="d-flex m-0 position-absolute"
        style={{ left: 40 }}
      >
        <FontAwesomeIcon icon={faSearch} color="#0000FF" />
      </Form.Label>
      <Form.Control
        style={{ paddingLeft: 30 }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </Form.Group>
    <Accordion id="client-sidebar">
      <ListFilter
        title={"Giới"}
        data={gioi}
        handleSelect={handleSelect}
        filter={filter}
      />
      <ListFilter
        title={"Ngành"}
        data={nganh}
        handleSelect={handleSelect}
        filter={filter}
      />
      <ListFilter
        title={"Lớp"}
        data={lop}
        handleSelect={handleSelect}
        filter={filter}
      />
      <ListFilter
        title={"Họ"}
        data={ho}
        handleSelect={handleSelect}
        filter={filter}
      />
      <ListFilter
        title={"Bộ"}
        data={bo}
        handleSelect={handleSelect}
        filter={filter}
      />
    </Accordion>
    </>
  );
}

const ListFilter = ({ title, data, handleSelect, filter }) => {
  // console.log(filter);
  const isChecked = (props) => {
    return (
      filter.list_gioi.find((e) => e === props.id_gioi) ||
      filter.list_nganh.find((e) => e === props.id_nganh) ||
      filter.list_lop.find((e) => e === props.id_lop) ||
      filter.list_bo.find((e) => e === props.id_bo) ||
      filter.list_ho.find((e) => e === props.id_ho)
    );
  };
  return (
    <Accordion.Item className="d-block w-100" style={{border: 'none', margin: '0px 10px'}} eventKey={title}>
      <Accordion.Header className="title-filter" style={{border: '1px solid #111'}}>
        <span
          className="d-flex justify-content-between align-items-center"
        >
          {title}
        </span>
      </Accordion.Header>
      <Accordion.Body>
      {data ? (
          data.map((props, index) => (
            <div
              onClick={() => handleSelect(title, props)}
              className="item-filter"
              style={{
                cursor: "pointer",
                color: isChecked(props) ? "#0000FF" : "black",
              }}
              key={index}
            >
              {props.name}
            </div>
          ))
        ) : (
          <h5>Loading ...</h5>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
};
