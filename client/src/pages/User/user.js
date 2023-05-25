import { useContext } from "react"
import "./user.css"
import { AuthContext } from "../../Context/authContext"

const User = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div>
        <div>username: {user.username}</div>
        <div>email: {user.email}</div>
      </div>
    </div>
  )
}

export default User