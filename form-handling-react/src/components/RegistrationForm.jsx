import { useState } from "react";

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(""); 
  
  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!username) {
      setErrors("Username is required");
      return;
    }

    if (!email) {
      setErrors("Email is required");
      return;
    }

    if (!password) {
      setErrors("Password is required");
      return;
    }

    setErrors("");
    console.log("User Registered:", { username, email, password });
    alert("User registered successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Controlled Registration Form</h2>

      {errors && <p style={{ color: "red" }}>{errors}</p>}

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
