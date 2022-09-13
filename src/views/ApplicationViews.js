import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"

import { RoomList } from "../components/rooms/RoomList"
import { RoomForm } from "../components/rooms/RoomForm"
import { RoomEdit } from "../components/rooms/RoomEdit"
import { EventList } from "../components/events/EventList"
import { EventForm } from "../components/events/EventForm"
import { EventEdit } from "../components/events/EventEdit"
import { ItemList } from "../components/items/ItemList"
import { ItemForm } from "../components/items/ItemForm"
import { ItemEdit } from "../components/items/ItemEdit"

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/rooms" element={< RoomList />} />
                <Route path="/rooms/create" element={< RoomForm />} />
                <Route path="/rooms/edit/:roomId" element={< RoomEdit />} />
                <Route path="/events" element={< EventList />} />
                <Route path="/events/new" element={< EventForm />} />
                <Route path="/events/edit/:eventId" element={< EventEdit />} />
                <Route path="/items" element={< ItemList />} />
                <Route path="/items/new" element={< ItemForm />} />
                <Route path="/items/edit/:itemId" element={< ItemEdit />} />
            </Route>
        </Routes>
    </>
}
