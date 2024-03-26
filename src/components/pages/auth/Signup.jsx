const Signup = () => {
  return (
    <div className="flex justify-center items-center h-[90vh]">
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body flex flex-col items-center">
          <div className="w-full flex justify-center">
            <h2 className="card-title text-4xl text-white">Signup</h2>
          </div>
          <div className="w-full">
            <input
              name="email"
              autoComplete="one-time-code"
              type="text"
              placeholder="email ..."
              className="input text-white input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="w-full">
            <input
              name="password"
              autoComplete="one-time-code"
              type="password"
              placeholder="password"
              className="input text-white input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="w-full">
            <input
              name="name"
              autoComplete="one-time-code"
              type="text"
              placeholder="name"
              className="input text-white input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <details className="dropdown mb-4 w-full" id="userTypeDropDown">
            <summary className="btn"> "User Type"</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 text-white rounded-box w-52">
              <li>
                <a>customer</a>
              </li>
              <li>
                <a>engineer</a>
              </li>
              <li>
                <a>admin</a>
              </li>
            </ul>
          </details>

          <div className="w-full">
            <input
              name="clientName"
              autoComplete="one-time-code"
              type="text"
              placeholder="client name"
              className="input text-white input-bordered input-primary w-full max-w-xs"
            />
          </div>

          <div className="w-full card-actions mt-4">
            <button className="btn btn-warning w-full font-bold text-xl hover:bg-yellow-400 transition-all ease-in-out duration-300">
              Submit
            </button>
          </div>

          <p className="text-l text-white">Already have an account ?</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
