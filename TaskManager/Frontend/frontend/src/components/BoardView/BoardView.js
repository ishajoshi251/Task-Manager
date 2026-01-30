import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "./Boardview.css";
import { useLocation } from "react-router";
import TitleBar from "../Dashboard/TitleBar";
import "font-awesome/css/font-awesome.css";
import axios from "axios";

const BoardView = () => {
  const location = useLocation();
  const user_name = location.state.user_name;
  const board_id = location.state.board_id;
  const board_name = location.state.board_name;
  const [boardData, setBoardData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [isJoined, setIsJoined]=useState(false);
  const statusList = ["To Do", "In Progress", "Done", "Cancelled"];
  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get(
          `http://127.0.0.1:8000/${user_name}/${board_id}/board_details`
        );
        setTaskData(res.data.data.task_list);
        setBoardData(res.data.data.board_list);
        setIsJoined(res.data.data.bool);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  });

  const TaskBoard = taskData.map((ele) => {
    let onClickStatusDropdown = async (task_id, task_status) => {
      try {
        let res = await axios.put(
          `http://127.0.0.1:8000/${user_name}/${board_id}/${task_id}/setstatus`,
          {
            task_status: task_status,
          }
        );
      } catch (e) {
        console.log(e);
      }
      return;
    };

    const status = statusList.map((status_str) => {
      return (
        <>
          <li className="btn-link">
            <button
              className="btn w-100 h-100 p-0"
              onClick={() => onClickStatusDropdown(ele.task_id, status_str)}
            >
              {status_str}
            </button>
          </li>
        </>
      );
    });

    const assignTask = async (task_id) => {
      if(!isJoined) {
        alert("Can't Assign. You Have not joined the Board !");
        return;
      } 
      try {
        let res = await axios.put(
          `http://127.0.0.1:8000/${user_name}/${board_id}/${task_id}/assign`
        );
      } catch (e) {
        console.log(e);
      }
      return;
    };

    return (
      <tr className="row m-0" key={ele.task_id}>
        <td className="table-cell tr-first-child col-3">
          {ele.task_status === "To Do" ? (
            <div className="task-box w-100 position-relative">
              <span className="float-right fs-6 top-0 end-0 h-auto bg-white p-1 btn-group dropend">
                <button
                  type="button"
                  className="btn dropdown-toggle p-0 ps-1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <ul className="dropdown-menu">{status}</ul>
              </span>
              <h4>{ele.task_name}</h4>
              <p>{ele.task_desc}</p>
              <p className="time">Created at: {ele.time_stamp}</p>
              {ele.assigned_to != "Not assigned" ? (
                <>
                  <i className="fa fa-check-circle disabled"></i>
                  <p>Assigned to : {ele.assigned_to}</p>
                </>
              ) : (
                <i
                  className="fa fa-plus-circle"
                  onClick={() => assignTask(ele.task_id)}
                ></i>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </td>

        <td className="table-cell tr-second-child col-3">
          {ele.task_status === "In Progress" ? (
            <div className="task-box w-100 position-relative">
              <span className="float-right fs-6 top-0 end-0 h-auto bg-white p-1 btn-group dropend">
                <button
                  type="button"
                  className="btn dropdown-toggle p-0 ps-1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <ul className="dropdown-menu">{status}</ul>
              </span>
              <h4>{ele.task_name}</h4>
              <p>{ele.task_desc}</p>
              <p className="time">Created at: {ele.time_stamp}</p>
              {ele.assigned_to != "Not assigned" ? (
                <>
                  <i className="fa fa-check-circle disabled"></i>
                  <p>Assigned to : {ele.assigned_to}</p>
                </>
              ) : (
                <i
                  className="fa fa-plus-circle"
                  onClick={() => assignTask(ele.task_id)}
                ></i>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </td>

        <td className="table-cell tr-third-child col-3">
          {ele.task_status === "Done" ? (
            <div className="task-box w-100 position-relative">
              <span className="float-right fs-6 top-0 end-0 h-auto bg-white p-1 btn-group dropend">
                <button
                  type="button"
                  className="btn dropdown-toggle p-0 ps-1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <ul className="dropdown-menu">{status}</ul>
              </span>
              <h4>{ele.task_name}</h4>
              <p>{ele.task_desc}</p>
              <p className="time">Created at: {ele.time_stamp}</p>
              {ele.assigned_to != "Not assigned" ? (
                <>
                  <i className="fa fa-check-circle disabled"></i>
                  <p>Assigned to : {ele.assigned_to}</p>
                </>
              ) : (
                <i
                  className="fa fa-plus-circle"
                  onClick={() => assignTask(ele.task_id)}
                ></i>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </td>

        <td className="table-cell tr-fourth-child col-3">
          {ele.task_status === "Cancelled" ? (
            <div className="task-box w-100 position-relative">
              <span className="float-right fs-6 top-0 end-0 h-auto bg-white p-1 btn-group dropend">
                <button
                  type="button"
                  className="btn dropdown-toggle p-0 ps-1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></button>
                <ul className="dropdown-menu">{status}</ul>
              </span>
              <h4>{ele.task_name}</h4>
              <p>{ele.task_desc}</p>
              <p className="time">Created at: {ele.time_stamp}</p>
              {ele.assigned_to != "Not assigned" ? (
                <>
                  <i className="fa fa-check-circle disabled"></i>
                  <p>Assigned to : {ele.assigned_to}</p>
                </>
              ) : (
                <i
                  className="fa fa-plus-circle"
                  onClick={() => assignTask(ele.task_id)}
                ></i>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="m-0">

      <TitleBar
        user_name={user_name}
        board_id={board_id}
        boardData={boardData}
      />

      <div className="board_view_body mx-5">
        <h2 className="mt-4 text-center">{board_name}</h2>
        <Table>
          <thead>
            <tr className="row">
              <th className="table-header col-3">To Do</th>
              <th className="table-header col-3">In Progress</th>
              <th className="table-header col-3">Done</th>
              <th className="table-header col-3">Cancelled</th>
            </tr>
          </thead>
        </Table>

        <div id="tasktable_div">
          <Table striped bordered responsive>
            <tbody>{TaskBoard}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
