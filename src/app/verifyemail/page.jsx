"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./verify.module.css";

function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  async function verifyUserEmail() {
    try {
      const res = await axios.post("/api/users/verifyemail", {token});

      setVerified(true);
    } catch (error) {
      console.log(error);
      setError(true);
      toast.error(error.response.data.error);
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className={styles.container}>
      <h1>Verify Email</h1>
      <h2>{token ? `${token}` : "No token"}</h2>
      {verified && (
        <div>
          <h2>Email Verified</h2>
          <Link href="/login">Proceed to Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>There was an error!!</h2>
        </div>
      )}
    </div>
  );
}

export default VerifyEmailPage;
