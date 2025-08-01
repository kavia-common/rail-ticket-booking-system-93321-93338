#!/bin/bash
cd /home/kavia/workspace/code-generation/rail-ticket-booking-system-93321-93338/rail_ticket_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

