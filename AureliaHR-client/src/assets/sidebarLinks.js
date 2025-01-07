import dashboardIcon from "../assets/img/dashboard-icon.svg";
import tasksIcon from "../assets/img/tasks-icon.svg";
import completedIcon from "../assets/img/completed-icon.svg"; 
import inProgressIcon from "../assets/img/in-progress-icon.svg";
import toDoIcon from "../assets/img/todo-icon.svg";
import teamIcon from "../assets/img/team-icon.svg";
import trashIcon from "../assets/img/trash-icon.svg";

export const sidebarLinks = [
    { href: "/dashboard", label: "Dashboard", icon: dashboardIcon },
    { href: "/tasks", label: "Tasks", icon: tasksIcon },
    { href: "/completed/completed", label: "Completed", icon: completedIcon },
    { href: "/in-progress/in progress", label: "In Progress", icon: inProgressIcon },
    { href: "/todo/todo", label: "To Do", icon: toDoIcon },
    { href: "/team", label: "Team", icon: teamIcon },
    { href: "/trashed", label: "Trash", icon: trashIcon },
];