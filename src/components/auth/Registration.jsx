import React, { useState } from "react"
import { registerUser } from "../utils/ApiFunctions"
import { Link } from "react-router-dom"
import "../../assets/styles/auth.css"

const Registration = () => {
	const [registration, setRegistration] = useState({
		name:"",
		email: "",
		password: ""
	})

	const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")

	const handleInputChange = (e) => {
		setRegistration({ ...registration, [e.target.name]: e.target.value })
	}
	const handleRegistration = async (e) => {
		e.preventDefault()
		try {
			const result = await registerUser(registration)
			setSuccessMessage(result)
			setErrorMessage("")
			setRegistration({ name:"", email: "", password: "" })
		} catch (error) {
			setSuccessMessage("")
			// Chỉ hiển thị message từ backend, không thêm prefix "Lỗi đăng ký"
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setErrorMessage("")
			setSuccessMessage("")
		}, 5000)
	}
	return (
		<div className="auth-container">
			<div className="auth-card">
				<div className="auth-header">
					<h2 className="auth-title">Đăng Ký</h2>
					<p className="auth-subtitle">Tạo tài khoản mới để trải nghiệm dịch vụ của chúng tôi</p>
				</div>

				{errorMessage && (
					<div className="alert alert-error">
						<i className="fas fa-exclamation-circle"></i>
						{errorMessage}
					</div>
				)}
				{successMessage && (
					<div className="alert alert-success">
						<i className="fas fa-check-circle"></i>
						{successMessage}
					</div>
				)}

				<form onSubmit={handleRegistration} className="auth-form">
					<div className="form-group">
						<label htmlFor="name" className="form-label">
							<i className="fas fa-user"></i>
							Họ và tên
						</label>
						<input
							id="name"
							name="name"
							type="text"
							className="form-input"
							placeholder="Nhập họ và tên của bạn"
							value={registration.name}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="email" className="form-label">
							<i className="fas fa-envelope"></i>
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							className="form-input"
							placeholder="Nhập địa chỉ email"
							value={registration.email}
							onChange={handleInputChange}
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="password" className="form-label">
							<i className="fas fa-lock"></i>
							Mật khẩu
						</label>
						<input
							id="password"
							name="password"
							type="password"
							className="form-input"
							placeholder="Nhập mật khẩu"
							value={registration.password}
							onChange={handleInputChange}
							required
						/>
					</div>

					<button type="submit" className="auth-button">
						<i className="fas fa-user-plus"></i>
						Đăng Ký
					</button>

					<div className="auth-footer">
						<p>
							Bạn đã có tài khoản? 
							<Link to="/login" className="auth-link">Đăng nhập ngay</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Registration