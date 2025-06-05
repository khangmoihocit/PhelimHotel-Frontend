import React, { createContext, useState, useContext, useEffect } from "react"
import {jwtDecode} from "jwt-decode"

export const AuthContext = createContext({
	user: null,
	userName: null,
	handleLogin: (token, userInfo) => {},
	handleLogout: () => {}
})

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [userName, setUserName] = useState(null)	// Khôi phục authentication state từ localStorage khi app khởi động
	useEffect(() => {
		const token = localStorage.getItem("token")
		const storedUserName = localStorage.getItem("userName")
		
		
		if (token) {
			try {
				const decodedUser = jwtDecode(token)
				setUser(decodedUser)
			} catch (error) {
				console.error("Invalid token:", error)
				// Xóa token không hợp lệ
				localStorage.removeItem("token")
				localStorage.removeItem("userId")
				localStorage.removeItem("userRole")
				localStorage.removeItem("userName")
			}
		}
		
		if (storedUserName) {
			setUserName(storedUserName)
		}
	}, [])




	const handleLogin = (token, userInfo = null) => {
		const decodedUser = jwtDecode(token)
		
		localStorage.setItem("userId", decodedUser.sub)
		localStorage.setItem("userRole", decodedUser.roles)
		localStorage.setItem("token", token)
		
		// Lưu userName nếu có
		if (userInfo && userInfo.name) {
			localStorage.setItem("userName", userInfo.name)
			setUserName(userInfo.name)
		}
		
		setUser(decodedUser)
		window.dispatchEvent(new Event('localStorageChange'));
	}
	
	const handleLogout = () => {
		localStorage.removeItem("userId")
		localStorage.removeItem("userRole")
		localStorage.removeItem("token")
		localStorage.removeItem("userName")
		setUser(null)
		setUserName(null)
		
		window.dispatchEvent(new Event('localStorageChange'));
	}

	return (
		<AuthContext.Provider value={{ user, userName, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}