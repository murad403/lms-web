/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";

type WebSocketOptions = {
  onMessage?: (data: any) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
  onClose?: () => void;
};

export const useWebSocket = (
  url: string | null,
  options: WebSocketOptions = {}
) => {
  const wsRef = useRef<WebSocket | null>(null);
  const optionsRef = useRef(options);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    let reconnectTimeout: NodeJS.Timeout;
    let isMounted = true;

    const connect = () => {
      if (!url) {
        setIsConnected(false);
        return;
      }

      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!isMounted) return;
        setIsConnected(true);
        optionsRef.current.onOpen?.();
      };

      ws.onmessage = (event) => {
        if (!isMounted) return;
        try {
          const data = JSON.parse(event.data);
          optionsRef.current.onMessage?.(data);
        } catch (error) {
          console.error("WebSocket parse error:", error);
        }
      };

      ws.onerror = (error) => {
        if (!isMounted) return;
        optionsRef.current.onError?.(error);
      };

      ws.onclose = () => {
        if (!isMounted) return;
        setIsConnected(false);
        optionsRef.current.onClose?.();
        // Reconnect after 3 seconds
        reconnectTimeout = setTimeout(connect, 3000);
      };
    };

    connect();

    return () => {
      isMounted = false;
      clearTimeout(reconnectTimeout);
      if (wsRef.current) {
        wsRef.current.onclose = null;
        wsRef.current.close();
      }
      wsRef.current = null;
    };
  }, [url]);

  const sendMessage = useCallback((data: object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
      return true;
    }

    console.warn("WebSocket is not open");
    return false;
  }, []);

  return { isConnected, sendMessage };
};