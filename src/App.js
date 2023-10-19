import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import "firebase/compat/firestore";

import AddFab from "./components/AddFab";
import AddTaskDialog from "./components/AddTaskDialog";
import { Box } from "@mui/material";
import StatusTabs from "./components/StatusTabs";
import TaskTable from "./components/TaskTable";
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";

firebase.initializeApp({
  apiKey: "AIzaSyCsp24kz8k07Xzj0M3Okl8CgRA3U_z3xro",
  authDomain: "sc-to-do.firebaseapp.com",
  projectId: "sc-to-do",
  storageBucket: "sc-to-do.appspot.com",
  messagingSenderId: "882433648365",
  appId: "1:882433648365:web:af0ef17468a30f36584ee4",
});

const firestore = firebase.firestore();

const converter = {
  toFirestore(post) {
    return post;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      ...data,
    };
  },
};

function App() {
  const tasksRef = firestore.collection("tasks").withConverter(converter);
  const query = tasksRef.orderBy("createdAt", "desc");
  const [tasks] = useCollectionData(query, {
    idField: "id",
  });
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [tab, setTab] = useState("all");

  const onTabChange = (event, newTab) => {
    setTab(newTab);
  };

  const openAddTaskDialog = () => {
    setAddTaskDialogOpen(true);
  };

  const closeAddTaskDialog = () => {
    setAddTaskDialogOpen(false);
  };

  const submitNewTask = async (newTask) => {
    await tasksRef.add(newTask);
  };

  const deleteTask = async (taskId) => {
    await tasksRef.doc(taskId).delete();
  };

  const updateTask = async (taskId, updatedTask) => {
    await tasksRef.doc(taskId).update(updatedTask);
  };

  const onCheckedChange = async (taskId, checked) => {
    await updateTask(taskId, { done: checked });
  };

  return (
    <Box
      className="App"
      sx={{
        p: 4,
      }}
    >
      <h1>To do list</h1>
      <StatusTabs tab={tab} onTabChange={onTabChange} />
      <TaskTable
        tab={tab}
        tasks={tasks}
        deleteTask={deleteTask}
        onCheckedChange={onCheckedChange}
      />
      <AddFab onClick={openAddTaskDialog} />
      <AddTaskDialog
        open={addTaskDialogOpen}
        onClose={closeAddTaskDialog}
        submitNewTask={submitNewTask}
      />
    </Box>
  );
}

export default App;
