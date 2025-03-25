"use client"
import React, { useEffect, useRef } from 'react';

export interface TimerData {
    id: string;
    name: string;
    // 'time' representa el tiempo acumulado en milisegundos (hasta el último reinicio o pausa)
    time: number;
    isRunning: boolean;
}

interface TimerProps {
    timer: TimerData;
    onUpdate: (updated: TimerData) => void;
    onDelete?: (id: string) => void;
    onReset?: (id: string) => void;
}

const Timer: React.FC<TimerProps> = ({ timer, onUpdate, onDelete, onReset }) => {
    // Guarda el momento en que se inició el timer o se reanudó
    const startRef = useRef<number | null>(null);
    // Guarda un identificador del interval
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Cuando se active el timer, guardamos el timestamp inicial
    useEffect(() => {
        if (timer.isRunning && startRef.current === null) {
            startRef.current = Date.now();
        }
    }, [timer.isRunning]);

    useEffect(() => {
        if (timer.isRunning) {
            // Se inicia el interval (aunque si la pestaña se oculta, aunque se desaceleren, el cálculo se hará según Date.now())
            intervalRef.current = setInterval(() => {
                if (startRef.current !== null) {
                    // El nuevo tiempo es el tiempo acumulado previo más la diferencia real desde que se inició
                    const elapsed = Date.now() - startRef.current;
                    onUpdate({ ...timer, time: timer.time + elapsed });
                    // Reiniciamos startRef para contabilizar el siguiente intervalo desde ahora
                    startRef.current = Date.now();
                }
            }, 250); // 250ms es un compromiso para actualizar la UI sin sobrecargar de re-render
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [timer.isRunning, timer, onUpdate]);

    const toggleTimer = () => {
        if (timer.isRunning) {
            // Al pausar, se detiene el interval y se reinicia startRef
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            startRef.current = null;
            onUpdate({ ...timer, isRunning: false });
        } else {
            // Al iniciar, se establece startRef y se activa el timer
            startRef.current = Date.now();
            onUpdate({ ...timer, isRunning: true });
        }
    };

    const resetInternal = () => {
        // Reinicia el tiempo acumulado y detiene la cuenta
        startRef.current = null;
        onUpdate({ ...timer, time: 0, isRunning: false });
        // Si se cuenta con un callback de reset externo, se lo llama
        if (onReset) {
            onReset(timer.id);
        }
    };

    const formatTime = (milliseconds: number) => {
        const hours = Math.floor(milliseconds / 3600000);
        const minutes = Math.floor((milliseconds % 3600000) / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const hoursStr = hours > 0 ? `${hours} ${hours === 1 ? 'hora' : 'horas'} ` : '';
        const minutesStr = minutes > 0 ? `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} ` : '';
        const secondsStr = `${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`;
        return `${hoursStr}${minutesStr}${secondsStr}`.trim();
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <h2>{timer.name}</h2>
            <h1>{formatTime(timer.time)}</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={toggleTimer} style={{ padding: '10px 20px', fontSize: '16px' }}>
                    {timer.isRunning ? 'Pausar' : 'Iniciar'}
                </button>
                <button onClick={resetInternal} style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Reiniciar
                </button>
                <button onClick={() => onDelete && onDelete(timer.id)} style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Borrar
                </button>
            </div>
        </div>
    );
};

export default Timer;