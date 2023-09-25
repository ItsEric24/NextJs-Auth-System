"use client";

import styles from "./profile.module.css";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("")
  async function logout() {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/logout");
      toast.success(res.data.message);
      router.push("/login");
    } catch (error) {
      toast.error("");
    } finally {
      setLoading(false);
    }
  }

  const getUserDetails = async() =>{
      const res = await axios.get("/api/users/userinfo");
      console.log(res.data);
      setUserData(res.data.data.username)
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile Page</h1>
      <button className={styles.btn} onClick={logout}>
        {loading ? "Loading..." : "Log out"}
      </button>
      <button className={styles.btn} onClick={getUserDetails}><Link href={`/profile/${userData}`}>Visit Profile</Link></button>
    </div>
  );
}

export default Profile;
