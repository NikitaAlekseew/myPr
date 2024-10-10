// @ts-ignore
import { useEffect, useState } from "react";
import axios from "axios";

const IpAddress = () => {
  const [ip, setIp] = useState("");
  console.log("ip", ip);

  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIp(response.data.ip);
      } catch (error) {
        console.error("Ошибка при получении IP-адреса:", error);
      }
    };

    fetchIp();
  }, []);

  return <div></div>;
};

export default IpAddress;
