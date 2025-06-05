import React, { createContext, useState, useContext, useEffect } from "react"
import {jwtDecode} from "jwt-decode"

export const AuthContext = createContext({
	user: null,
	isLoading: true,
	handleLogin: (token) => {},
	handleLogout: () => {}
})

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const handleLogin = (token) => {
		const decodedUser = jwtDecode(token)
		localStorage.setItem("userId", decodedUser.sub)
		localStorage.setItem("userRole", decodedUser.roles)
		localStorage.setItem("token", token)
		setUser(decodedUser)
	}

	const handleLogout = () => {
		localStorage.removeItem("userId")
		localStorage.removeItem("userRole")
		localStorage.removeItem("token")
		setUser(null)
	}

	// Khôi phục trạng thái user từ localStorage khi component mount
	useEffect(() => {
		const token = localStorage.getItem("token")
		if (token) {
			try {
				const decodedUser = jwtDecode(token)
				// Kiểm tra xem token có hết hạn không
				const currentTime = Date.now() / 1000
				if (decodedUser.exp > currentTime) {
					setUser(decodedUser)
				} else {
					// Token hết hạn, xóa khỏi localStorage
					handleLogout()
				}
			} catch (error) {
				console.error("Error decoding token:", error)
				// Token không hợp lệ, xóa khỏi localStorage
				handleLogout()
			}
		}
		setIsLoading(false)
	}, [])
	return (
		<AuthContext.Provider value={{ user, isLoading, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}