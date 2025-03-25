"use client"
import React, { useState, useEffect } from 'react';
import Timer, { TimerData } from './Timer';

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') return initialValue;
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            try {
                window.localStorage.setItem(key, JSON.stringify(storedValue));
            } catch (error) {
                console.error(error);
            }
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
}

const TimerList: React.FC = () => {
    const [hasMounted, setHasMounted] = useState(false);
    const [timers, setTimers] = useLocalStorage<TimerData[]>('timers', []);
    const [newTimerName, setNewTimerName] = useState('');

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (hasMounted && timers.length === 0) {
            const defaultTimers: TimerData[] = [
                { id: Date.now().toString() + "_1", name: 'Timer 1', time: 0, isRunning: false }
            ];
            setTimers(defaultTimers);
        }
    }, [hasMounted]);

    const addTimer = () => {
        if (newTimerName.trim() === '') return;
        const newTimer: TimerData = {
            id: Date.now().toString(),
            name: newTimerName,
            time: 0,
            isRunning: false,
        };
        setTimers([...timers, newTimer]);
        setNewTimerName('');
    };

    const updateTimer = (updated: TimerData) => {
        setTimers(timers.map(timer => timer.id === updated.id ? updated : timer));
    };

    const deleteTimer = (id: string) => {
        setTimers(timers.filter(timer => timer.id !== id));
    };

    const resetTimer = (id: string) => {
        setTimers(
            timers.map(timer =>
                timer.id === id ? { ...timer, time: 0, isRunning: false } : timer
            )
        );
    };

    return (
        <div style={{ padding: '20px' }}>
            { !hasMounted ? null : (
                <>
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Nombre del Timer"
                            value={newTimerName}
                            onChange={(e) => setNewTimerName(e.target.value)}
                            style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
                        />
                        <button onClick={addTimer} style={{ padding: '10px 20px', fontSize: '16px' }}>
                            Agregar Timer
                        </button>
                    </div>
                    {timers.map(timer => (
                        <Timer 
                            key={timer.id} 
                            timer={timer} 
                            onUpdate={updateTimer} 
                            onDelete={deleteTimer} 
                            onReset={resetTimer}
                        />
                    ))}
                </>
            )}
        </div>
    );
};

export default TimerList;