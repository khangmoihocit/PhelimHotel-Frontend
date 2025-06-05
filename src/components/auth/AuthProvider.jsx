import React, { createContext, useState, useContext, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

export const AuthContext = createContext({
	user: null,
	handleLogin: (token) => {},
	handleLogout: () => {},
	clearAuthData: () => {}
})

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	// Initialize user from localStorage on app start
	useEffect(() => {
		const storedUserId = localStorage.getItem("userId");
		const storedToken = localStorage.getItem("token");
		const storedUserRole = localStorage.getItem("userRole");
		
		if (storedUserId) {
			// Reconstruct basic user object from stored data
			const userData = {
				id: parseInt(storedUserId),
				roles: storedUserRole ? [{ name: storedUserRole }] : []
			};
			
			setUser(userData);
			console.log("User restored from localStorage:", userData);
		}
	}, []);

	const handleLogin = (loginResponse) => {
		console.log("AuthProvider received:", loginResponse); // Debug log
		
		// The login response could be:
		// 1. Just user data: { id: 3, email: "...", name: "...", roles: [...] }
		// 2. User data with token: { user: {...}, token: "jwt-token" }
		// 3. Token with user embedded: { token: "jwt-token", id: 3, email: "...", ... }
		
		let userData = null;
		let token = null;
		
		if (loginResponse) {
			if (loginResponse.user && loginResponse.token) {
				// Format: { user: {...}, token: "..." }
				userData = loginResponse.user;
				token = loginResponse.token;
			} else if (loginResponse.token && (loginResponse.id || loginResponse.email)) {
				// Format: { token: "...", id: 3, email: "...", ... }
				token = loginResponse.token;
				userData = { ...loginResponse };
				delete userData.token; // Remove token from user data
			} else if (loginResponse.id || loginResponse.email) {
				// Format: { id: 3, email: "...", name: "...", roles: [...] }
				userData = loginResponse;
				// Check if token is embedded
				token = loginResponse.token || loginResponse.accessToken || loginResponse.jwt;
			} else if (typeof loginResponse === 'string') {
				// Just a token string
				token = loginResponse;
			}
		}
		
		console.log("Extracted userData:", userData);
		console.log("Extracted token:", token ? "Present" : "Missing");
				if (userData && userData.id) {
			// Store user ID as string for consistency
			console.log("Storing userId:", userData.id, "Type:", typeof userData.id);
			localStorage.setItem("userId", userData.id.toString());
			console.log("Stored userId in localStorage:", localStorage.getItem("userId"));
			
			// Store user role
			const userRole = userData.roles && userData.roles.length > 0 
				? userData.roles[0].name 
				: "ROLE_USER";
			localStorage.setItem("userRole", userRole);
			
			// Set user state
			setUser(userData);
			console.log("Successfully stored user data. User ID:", userData.id);
		}
		
		// Store token if available
		if (token) {
			localStorage.setItem("token", token);
			console.log("Token stored successfully");
		} else {
			console.warn("No token received - API calls may fail");
		}
		
		// If we don't have user data but have token, try to decode it
		if (!userData && token) {
			try {
				const decodedUser = jwtDecode(token);
				console.log("Decoded JWT:", decodedUser);
				
				// Try to extract user ID from JWT
				const userId = decodedUser.userId || decodedUser.id || decodedUser.sub;
				if (userId) {
					localStorage.setItem("userId", userId.toString());
					localStorage.setItem("userRole", decodedUser.roles || decodedUser.role || "ROLE_USER");
					setUser(decodedUser);
					console.log("Successfully extracted user from JWT. User ID:", userId);
				}
			} catch (error) {
				console.error("Error decoding JWT:", error);
			}
		}
		
		// If we still don't have valid user data, clear everything
		if (!userData && (!token || !localStorage.getItem("userId"))) {
			console.error("Invalid login response - no user data or token found");
			localStorage.removeItem("userId");
			localStorage.removeItem("userRole");
			localStorage.removeItem("token");
			setUser(null);
		}
	}

	const handleLogout = () => {
		localStorage.removeItem("userId")
		localStorage.removeItem("userRole")
		localStorage.removeItem("token")
		setUser(null)
	}

	// Clear all authentication data - useful for debugging
	const clearAuthData = () => {
		console.log("Clearing all authentication data...");
		localStorage.removeItem("userId");
		localStorage.removeItem("userRole");
		localStorage.removeItem("token");
		setUser(null);
		console.log("Authentication data cleared");
	};

	return (
		<AuthContext.Provider value={{ user, handleLogin, handleLogout, clearAuthData }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	return useContext(AuthContext)
}