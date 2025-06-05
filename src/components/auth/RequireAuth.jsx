import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "./AuthProvider"

const RequireAuth = ({ children }) => {
	const { user, isLoading } = useAuth()
	const location = useLocation()
	
	if (isLoading) {
		return (
			<div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Đang tải...</span>
				</div>
			</div>
		)
	}
	
	if (!user) {
		return <Navigate to="/login" state={{ path: location.pathname }} />
	}
	return children
}
export default RequireAuth