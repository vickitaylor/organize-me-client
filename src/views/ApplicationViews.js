import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"

import { RoomList } from "../components/rooms/RoomList"
import { RoomForm } from "../components/rooms/RoomForm"
import { RoomEdit } from "../components/rooms/RoomEdit"

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/rooms" element={< RoomList />} />
                <Route path="/rooms/create" element={< RoomForm />} />
                <Route path="/rooms/edit/:roomId" element={< RoomEdit />} />
            </Route>
        </Routes>
    </>
}
