import { RouterProvider } from "react-router"
import { router } from "./app.routes"
import { AuthProvider } from "./auth/auth.context"
import { SongContextProvider } from "./features/home/song.context"
function App() {

  return (
    <AuthProvider>
      <SongContextProvider>
    <RouterProvider router={router}/>
    </SongContextProvider>
    </AuthProvider>
  )
}

export default App