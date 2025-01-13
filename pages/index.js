import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import MainPane from "@/components/MainPane/Mainpane";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <>
      <div className="flex">
        <Sidebar setSelectedUser={setSelectedUser} />
        <MainPane selectedUser={selectedUser} />
      </div>
    </>
  );
}

  

