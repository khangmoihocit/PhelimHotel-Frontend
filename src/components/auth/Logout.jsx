import React, { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { Link, useNavigate } from "react-router-dom"

const Logout = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()
	const handleLogout = () => {
		auth.handleLogout()
		navigate("/", { state: { message: " Bạn đã đăng xuất thành công" } })
	}

	return (
		<button className="dropdown-item dropdown-item-custom" onClick={handleLogout}>
			<span className="dropdown-icon">🚪</span>
			Đăng xuất
		</button>
	)
}

export default Logout