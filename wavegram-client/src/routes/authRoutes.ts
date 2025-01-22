import Form from "../Pages/Form";
import Login from "../Pages/login/Login";
import SignUp from "../Pages/signup/SignUp";
import Dashboard from "../Pages/dashboard/Dashboard";
import Home from "../Pages/Home";
import Profile from "../Pages/profile/Profile";
import Preferences from "../Pages/preferences/Preferences";
import Friends from "../Pages/friends/Friends";
import CreateWaves from "../Pages/waves/CreateWaves";
import InviteFriends from "../Pages/friends/InviteFriends";
import ChangePassword from "../Pages/changePassword/ChangePassword";
import { Navigate } from 'react-router-dom';
import React from "react";

const token = sessionStorage.getItem("token");

const AuthRoutes = [
    {
        path: '/signup',
        layout: Form,
        component: SignUp ,
    },
    {
        path: '/login',
        layout: Form,
        component: Login,
    },
    {
        path: '/dashboard',
        layout: Home,
        component: Dashboard,
    },
    {
        path: '/profile',
        layout: Home,
        component: Profile,
    },
    {
        path: '/preferences',
        layout: Home,
        component: Preferences,
    },
    {
        path: '/friends',
        layout: Home,
        component: Friends,
    },
    {
        path: '/create-waves',
        layout: Home,
        component: CreateWaves,
    },
    {
        path: '/invite-friends',
        layout: Home,
        component: InviteFriends,
    },
    {
        path: '/change-password',
        layout: Home,
        component: ChangePassword,
    },
    {
        path: '*',
        element: React.createElement(Navigate, { to: token ? "/dashboard" : "/login" })
    }
];

export default AuthRoutes;