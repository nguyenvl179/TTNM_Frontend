import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Navbar from "../../common/client/Navbar";
import Sidebar from "../../common/client/Sidebar";
import GridViewAnimal from "../../components/View/GridViewAnimal";
import AnimalService from "../../services/AnimalService";
import "./style.css";
export default function Animal() {
  const [animals, setAnimals] = useState([]);
  const [filter, setFilter] = useState({
    list_gioi: [],
    list_nganh: [],
    list_lop: [],
    list_bo: [],
    list_ho: [],
  });
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const obj = {};
    obj.list_gioi = filter.list_gioi;
    obj.list_nganh = filter.list_nganh;
    obj.list_lop = filter.list_lop;
    obj.list_bo = filter.list_bo;
    obj.list_ho = filter.list_ho;
    if (animals.length > 0 && searchText !== "") {
      const results = animals.filter((animals) =>
        animals.ten_tieng_viet.toLowerCase().includes(searchText)
      );
      setAnimals(results);
    } else {
      obj.list_bo.length > 0 ||
      obj.list_nganh.length > 0 ||
      obj.list_lop.length > 0 ||
      obj.list_ho.length > 0 ||
      obj.list_ho.length > 0
        ? AnimalService.filterAnimal(obj).then((res) => setAnimals(res))
        : AnimalService.getAllAnimal().then((res) => {
            if (res.status === 200) {
              setAnimals(res.data);
            }
          });
    }
  }, [
    filter.list_gioi,
    filter.list_nganh,
    filter.list_lop,
    filter.list_bo,
    filter.list_ho,
    searchText,
  ]);
  const handleSelect = (title, props) => {
    if (
      filter.list_bo.find((e) => e === props.id_bo) ||
      filter.list_nganh.find((e) => e === props.id_nganh) ||
      filter.list_gioi.find((e) => e === props.id_gioi) ||
      filter.list_ho.find((e) => e === props.id_ho) ||
      filter.list_lop.find((e) => e === props.id_lop)
    ) {
      if (title === "Lớp") {
        const newList = filter.list_lop.filter((e) => e !== props.id_lop);
        setFilter({ ...filter, list_lop: newList });
      }
      if (title === "Giới") {
        const newList = filter.list_gioi.filter((e) => e !== props.id_gioi);
        setFilter({
          ...filter,
          list_gioi: newList,
        });
      }
      if (title === "Bộ") {
        const newList = filter.list_bo.filter((e) => e !== props.id_bo);
        setFilter({ ...filter, list_bo: newList });
      }
      if (title === "Ngành") {
        const newList = filter.list_nganh.filter((e) => e !== props.id_nganh);
        setFilter({ ...filter, list_nganh: newList });
      }
      if (title === "Họ") {
        const newList = filter.list_ho.filter((e) => e !== props.id_ho);
        setFilter({ ...filter, list_ho: newList });
      }
    } else {
      if (title === "Lớp")
        setFilter({ ...filter, list_lop: [...filter.list_lop, props.id_lop] });
      if (title === "Giới")
        setFilter({
          ...filter,
          list_gioi: [...filter.list_gioi, props.id_gioi],
        });
      if (title === "Bộ")
        setFilter({ ...filter, list_bo: [...filter.list_bo, props.id_bo] });
      if (title === "Ngành")
        setFilter({
          ...filter,
          list_nganh: [...filter.list_nganh, props.id_nganh],
        });
      if (title === "Họ")
        setFilter({ ...filter, list_ho: [...filter.list_ho, props.id_ho] });
    }
  };

  return (
    <>
      <Navbar searchText={searchText} setSearchText={setSearchText} />
      <Container id="content" fluid>
        <h2 className="text-center mt-3">Tìm kiếm động vật</h2>
        <Sidebar 
          searchText={searchText}
          setSearchText={setSearchText}
          handleSelect={handleSelect}
          filter={filter} 
        />
        <GridViewAnimal animals={animals} />
      </Container>
    </>
  );
}
