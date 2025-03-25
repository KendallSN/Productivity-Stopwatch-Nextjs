"use client"
import React from 'react';
import TimerList from '@/app/components/TimerList';

export default function Home() {
  return (
    <html>
      <body>
        <h1 style={{ textAlign: 'center' }}>Productivity Stopwatch</h1>
        <TimerList />
      </body>
    </html>
  );
}
