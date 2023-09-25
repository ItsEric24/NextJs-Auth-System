"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./login.module.css";
import { toast } from "react-toastify";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user.username.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      console.log(res.data);
      toast.success(res.data.message);
      router.push("/profile");
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="username"
          value={user.username}
          className={styles.inputField}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          required
        />
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="password"
          value={user.password}
          className={styles.inputField}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        <button className={styles.btn} disabled={buttonDisabled}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <Link href="/signup" className={styles.link}>
        If you don&apos;t have an account, Sign Up{" "}
      </Link>
    </div>
  );
}

export default Login;
