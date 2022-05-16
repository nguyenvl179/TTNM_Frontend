import { Route, Routes } from "react-router-dom";
import { access_token } from "./config/AuthConfig";
import AnimalManage from "./page/admin/Animal/AnimalManage";
import Animal from "./page/Animals/Animal";
import DetailAnimal from "./page/Animals/DetailAnimal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Animal />} />
      <Route path="/animal/detail/id_animal=:id" element={<DetailAnimal />} />

      <Route
        path="/adminstrator/animals"
        element={access_token ? <AnimalManage /> : <Animal />}
      />
    </Routes>
  );
}

export default App;
