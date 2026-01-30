import React, { useState, useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import "font-awesome/css/font-awesome.css";
import { useLocation } from "react-router";
import BoardList from "./BoardList";


function Dashboard(props) {
  const location = useLocation();
  const user_name=location.state.user_name;
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get(
          `http://127.0.0.1:8000/${user_name}/dashboard`
        );
        setBoardData(res.data.data.board_list);

      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  },[]);

  return (
    <div id="body_dashboard">
      <div id="dashboard">
        <BoardList user_name={user_name} boardData={boardData}/>
      </div>
    </div>
  );
}

export default Dashboard;
