import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  //const [error, setError] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log(data);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("address", data.address);
      formData.append("image", data.image);

      const res = await axios.post("http://localhost:8081/create", formData);
      console.log(res);
      if (res.status === 200) {
        navigate("/employee");
      }
      //   if (res.data.message === "success") {
      //     console.log(res);
      //     navigate("/employee");
      //   } else {
      //     setError(res.data.message);
      //   }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex flex-column align-items-center pt-5">
      <h2>Add Employees</h2>
      {/* <div className="text-danger">{error && error}</div> */}
      <form onSubmit={handleSubmit} className="row g-3 w-50">
        <div className="col-12">
          <label htmlFor="address" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            id="inputName4"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            autoComplete="off"
          />
        </div>
        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            id="inputEmail4"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            autoComplete="off"
          />
        </div>
        <div className="col-12">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            id="inputPassword4"
            onChange={(e) => setData({ ...data, password: e.target.value })}
            autoComplete="off"
          />
        </div>
        <div className="col-12">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="1234 Paradise street"
            id="inputAddress4"
            onChange={(e) => setData({ ...data, address: e.target.value })}
            autoComplete="off"
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputGroupFile01" className="form-label">
            Select Image
          </label>
          <input
            type="file"
            className="form-control"
            id="inputGroupFile01"
            onChange={(e) => setData({ ...data, image: e.target.files[0] })}
            autoComplete="off"
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success w-100">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
