import React, { useEffect, useState } from "react";
import {
  completeTaskApi,
  createTaskApi,
  deleteTaskApi,
  getAllTasksApi,
} from "../apis/API";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState('');

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getAllTasksApi().then((res) => {
      setTasks(res.data.tasks);
    });
  }, []);

  const moment = require("moment");

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("deadline", deadline);
    formData.append("priority", priority);

    createTaskApi(formData)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        toast.error("Server Error");
        console.log(err.message);
      });
  };

  const handleDelete = (id) => {
    const confirmDialog = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!confirmDialog) return;
    else {
      deleteTaskApi(id)
        .then((res) => {
          if (res.data.success === false) {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            window.location.reload();
          }
        })
        .catch((err) => {
          toast.error("Server error!");
          console.log(err.message);
        });
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const markAsComplete = (id) => {
    const confirmDialog = window.confirm(
      "Are you sure you completed this task?"
    );
    if (!confirmDialog) return;
    else {
      completeTaskApi(id)
        .then((res) => {
          if (res.data.success === false) {
            toast.error(res.data.message);
          } else {
            toast.success(res.data.message);
            window.location.reload();
          }
        })
        .catch((err) => {
          toast.error("Server error!");
          console.log(err.message);
        });
    }
  };

  return (
    <>
      <div className="dashboard-body" style={{ margin: "30px" }}>
        <div className="top d-flex" style={{ marginBottom: "30px" }}>
          <div className="box" style={{ marginRight: "30px" }}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button style={{ padding: "8px" }}>
              <i className="fas fa-search"></i>
            </button>
          </div>

          <div className="box" style={{ width: "20%", marginRight: "30px" }}>
            <span>Sort By: </span>
            <select
              class="form-select"
              aria-label="Default select example"
              style={{
                backgroundColor: "transparent",
                border: "none",
                width: "60%",
                outline: "none",
                boxShadow: "none",
                cursor: "pointer",
              }}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option selected>None</option>
              <option value="1">Priority</option>
              <option value="2">Deadline</option>
            </select>
          </div>

          <div className="box" style={{ width: "20%" }}>
            <span>Filter: </span>
            <select
              class="form-select"
              aria-label="Default select example"
              style={{
                backgroundColor: "transparent",
                border: "none",
                width: "70%",
                outline: "none",
                boxShadow: "none",
                cursor: "pointer",
              }}
            >
              <option selected>None</option>
              <option selected>Completed</option>
              <optgroup label="Priority">
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              </optgroup>
              <optgroup label="Deadline">
                <option value="4">Past</option>
                <option value="5">Today</option>
                <option value="6">Upcoming</option>
              </optgroup>
            </select>
          </div>
        </div>

        <div className="top d-flex" style={{ marginBottom: "30px" }}>
          <h1 style={{ marginRight: "auto" }}>Tasks</h1>
          <button
            type="button"
            className="box"
            style={{
              width: "18.5%",
              backgroundColor: "lightGreen",
              fontWeight: "bolder",
            }}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <span style={{ margin: "auto" }}>Add Task</span>
          </button>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Create New Task
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
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
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>

        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>Task</th>
              <th>Deadline</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <>
                <tr
                  className={
                    task.priority === "High"
                      ? "table-danger"
                      : task.priority === "Medium"
                      ? "table-warning"
                      : "table-success"
                  }
                >
                  <td>
                    {task.name}
                    <br />
                    <p style={{ fontSize: "12px" }}>{task.description}</p>
                  </td>
                  <td>{moment(task.deadline).format("YYYY-MM-DD")}</td>
                  <td>{task.priority}</td>
                  <td>{task.status}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      style={{ marginRight: "20px" }}
                      disabled={task.status === "Completed"}
                      onClick={() => markAsComplete(task._id)}
                    >
                      Mark as Complete
                    </button>
                    <Link
                    to={`/edit/${task._id}`}
                      className="btn btn-info"
                      style={{ marginRight: "20px" }}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                <tr className="table-success"></tr>
                <tr className="table-warning"></tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
