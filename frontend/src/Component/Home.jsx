const Home = () => {
  return (
    <>
      <div className="d-flex justify-content-around mt-5 p-2">
        <div className="px-2 pt-2 pb-3 w-25 border shadow-sm ">
          <div className="text-center pb-1">
            <p>Admin</p>
            <hr />
            <p>Total : {} </p>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 w-25 border shadow-sm ">
          <div className="text-center pb-1">
            <p>Employee</p>
            <hr />
            <p>Total : {} </p>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 w-25 border shadow-sm ">
          <div className="text-center pb-1">
            <p>Salary</p>
            <hr />
            <p>Total : {} </p>
          </div>
        </div>
      </div>

      {/* List of Admins */}
      <div className="px-5 mt-3">
        <h3>List of Admins</h3>
        <table className="table">
          <thead>
            <th>
              <th>Email</th>
              <th>Action</th>
            </th>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
