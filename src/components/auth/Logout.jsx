import React, { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { useNavigate } from "react-router-dom"
import { FaSignOutAlt } from "react-icons/fa"

const Logout = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()
	const handleLogout = () => {
		// Clear userName từ localStorage
		localStorage.removeItem("userName");
		auth.handleLogout()
		navigate("/", { state: { message: "Đăng xuất thành công!" } })
	}
	
	return (		<button 
			className="nav-link nav-link-custom btn btn-link p-0 border-0" 
			onClick={handleLogout}
			style={{ background: 'none', border: 'none', textDecoration: 'none' }}
		>
			<FaSignOutAlt className="nav-icon" />
			Đăng Xuất
		</button>
	)
}

export default Logout