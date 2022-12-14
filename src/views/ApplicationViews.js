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
import { HomePage } from "../components/home/HomePage"
import { ItemDetail } from "../components/items/ItemDetail"
import { RoomDetails } from "../components/rooms/RoomDetails"
import { ItemProperties } from "../components/items/ItemProperties"
import { PersonalizedItemDetail } from "../components/items/PersonalizedItemDetail"
import { AdminView } from "../components/admin/AdminView"
import { LikeList } from "../components/likes/LikeList"
import { UserList } from "../components/users/UserList"
import { RoomListFriend } from "../components/rooms/RoomListFriend"
import { EventListFriend } from "../components/events/EventListFriend"
import { EventCompleteList } from "../components/events/EventCompleteList"
import { RoomDetailsFriend } from "../components/rooms/RoomDetailsFriend"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/home" element={< HomePage />} />
                <Route path="/rooms" element={< RoomList />} />
                <Route path="/rooms/:roomId" element={< RoomDetails />} />
                <Route path="/rooms/create" element={< RoomForm />} />
                <Route path="/rooms/:roomId/edit" element={< RoomEdit />} />
                <Route path="/events" element={< EventList />} />
                <Route path="/events/new" element={< EventForm />} />
                <Route path="/events/edit/:eventId" element={< EventEdit />} />
                <Route path="/events/complete" element={< EventCompleteList />} />
                <Route path="/items" element={< ItemList />} />
                <Route path="/items/:itemId" element={< ItemDetail />} />
                <Route path="/items/new" element={< ItemForm />} />
                <Route path="/items/:itemId/edit" element={< ItemEdit />} />
                <Route path="/details/:itemPropId/edit" element={< ItemProperties />} />
                <Route path="/details/:itemPropId" element={< PersonalizedItemDetail />} />
                <Route path="/admin" element={< AdminView />} />
                <Route path="/likes" element={< LikeList />} />
                <Route path="/users" element={< UserList />} />
                <Route path="/events/friend/:userId" element={< EventListFriend />} />
                <Route path="/rooms/friend/:userId" element={< RoomListFriend />} />
                <Route path="/rooms/friendroom/:roomId" element={< RoomDetailsFriend />} />

            </Route>
        </Routes>
    </>
}
