import { useEffect, useState } from "react";

export default function useTelemetria() {
  const [telemetria, setTelemetria] = useState({
    lat: null,
    lon: null,
    alt: null,
    bateria_voltaje: null,
  });

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8765");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        setTelemetria((prev) => ({
          ...prev,
          ...data,
        }));
      } catch (error) {
        console.error("Error al parsear datos:", error);
      }
    };

    socket.onerror = (e) => console.error("WebSocket error:", e);
    socket.onclose = () => console.log("WebSocket cerrado");

    return () => socket.close();
  }, []);

  return telemetria;
}
