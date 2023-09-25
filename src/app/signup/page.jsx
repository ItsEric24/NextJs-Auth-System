"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./signup.module.css";
import { toast } from "react-toastify";

function SignUp() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  //* function to handle submitted credentials
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post("/api/users/signup", user);
      // console.log("Suucessfull response:", res.data);
      toast.success(res.data.message);
      router.push("/login");
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
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
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="email"
          value={user.email}
          className={styles.inputField}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <Link href="/login" className={styles.link}>
        If you have an account, Login
      </Link>
    </div>
  );
}

export default SignUp;
