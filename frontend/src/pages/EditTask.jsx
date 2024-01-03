import React, { useEffect, useState } from "react";
import { getSingleTaskApi, updateTaskApi } from "../apis/API";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const { id } = useParams();

  const { navigate } = useNavigate();

  useEffect(() => {
    getSingleTaskApi(id).then((res) => {
      console.log(res.data);
      setName(res.data.task.name);
      setDescription(res.data.task.description);
      setDeadline(res.data.task.deadline);
      setPriority(res.data.task.priority);
    });
  }, [id]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //Making logical form data
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("deadline", deadline);
    formData.append("priority", priority);

    updateTaskApi(id, formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate("/home");
        }
      })
      .catch((err) => {
        toast.error("Server error!");
        console.log(err.message);
      });
  };

  return (
    <>
      <h2 className="m-4">Updating Task</h2>
      <div className="d-flex m-4 gap-4">
        <div className="">
          <div>
            <form>
              <label className="mb-2">Task Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="form-control mb-3"
                placeholder="Enter Task Name"
              />

              <label className="mb-2">Deadline</label>
              <input
                onChange={(e) => setDeadline(e.target.value)}
                type="date"
                className="form-control mb-3"
              />

              <label className="mb-2">Priority</label>
              <select
                className="form-control mb-3"
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value={null}>Select Priority</option>
                <option value={"High"}>High</option>
                <option value={"Medium"}>Medium</option>
                <option value={"Low"}>Low</option>
              </select>

              <label className="mb-2">Task Description</label>
              <input
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                className="form-control mb-3"
                placeholder="Enter Task Description"
              />
              <button
                className="btn btn-primary w-100 mt-2"
                onClick={handleSubmit}
              >
                Update Task
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTask;
