import React, { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { useNavigate } from "react-router-dom"

const Logout = () => {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()
	const handleLogout = () => {
		// Clear userName từ localStorage
		localStorage.removeItem("userName");
		auth.handleLogout()
		navigate("/", { state: { message: "Đăng xuất thành công!" } })
	}
	return (
		<button 
			className="dropdown-item dropdown-item-custom w-100 text-start border-0 bg-transparent" 
			onClick={handleLogout}
			style={{ background: 'none', border: 'none', padding: '0.5rem 1rem' }}
		>
			<span className="dropdown-icon">🚪</span>
			Đăng Xuất
		</button>
	)
}

export default Logout