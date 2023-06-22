import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  //const [error, setError] = useState("");

  const [data, setData] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/get/${id}`)
      .then((res) => {
        setData({
          ...data,
          name: res.data.Result[0].name,
          email: res.data.Result[0].email,
          salary: res.data.Result[0].salary,
          address: res.data.Result[0].address,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.put(`http://localhost:8081/update/${id}`, data);
      console.log(res);
      if (res.status === 200) {
        navigate("/employee");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex flex-column align-items-center pt-5">
      <h2>Update Employee</h2>
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
            value={data.name}
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
            value={data.email}
          />
        </div>
        <div className="col-12">
          <label htmlFor="salary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Salary"
            id="inputSalary4"
            onChange={(e) => setData({ ...data, salary: e.target.value })}
            autoComplete="off"
            value={data.salary}
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
            value={data.address}
          />
        </div>
        {/* <div className="col-12">
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
        </div> */}
        <div className="col-12">
          <button type="submit" className="btn btn-success w-100">
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
