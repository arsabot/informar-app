#!/bin/bash
while true; do
  echo "[$(date)] Starting tunnel..."
  ssh -p 443 -o StrictHostKeyChecking=no -o ServerAliveInterval=15 -o ServerAliveCountMax=3 -R0:localhost:5173 a.pinggy.io
  echo "[$(date)] Tunnel disconnected, reconnecting in 3 seconds..."
  sleep 3
done
