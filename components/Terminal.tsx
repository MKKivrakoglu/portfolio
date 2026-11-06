'use client'

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import TerminalResponse from "./terminal/TerminalResponse";
import TerminalUserText from "./terminal/TerminalUserText";
import { COMMAND, RESPONSE } from "@/constants/terminal";
import { helpResponse } from "./terminal/HelpObject";
import { useTerminalCommands } from "@/hooks/useTerminalCommands";

export default function Terminal() {
    const [command, setCommand] = useState("")
    const [focused, setFocused] = useState(true)
    const [commandCounter, setCommandCounter] = useState(0)
    const [commandHistory, setCommandHistory] = useState<String[]>([])
    const [responseHistory, setResponseHistory] = useState<ReactNode[]>([])

    const { executeCommand } = useTerminalCommands(clearTerminal)

    const terminalEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        terminalEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    }, [commandCounter]);

    function runCommand(event: FormEvent<HTMLElement>) {
        event.preventDefault()
        
        const input = command.trim()

        setCommandCounter(prev => prev + 1)
        
        if (!input) {
            setCommandHistory(prev => [...prev, ""]);
            setResponseHistory(prev => [...prev, (<></>)]);
            setCommand("");
            
            return
        }
        

        const result = executeCommand(input)

        if (result === null) return
        
        setCommandHistory(prev => [...prev, command])
        setResponseHistory(prev => [...prev, result])

        setCommand("")
    }

    function clearTerminal() {
        setCommand("")
        setCommandCounter(0)
        setCommandHistory([])
        setResponseHistory([])
    }

    return (
        <section 
            className="w-full p-4 font-mono font-extrabold text-green-400 bg-zinc-900 ax-h-[500px] overflow-y-auto" 
            aria-label="Portfolio navigation terminal"
        >
            <div className="flex flex-col">
                {Array.from( { length: commandCounter }, (_, i) => (
                    <div key={`history_outer_div_${i}`}>
                        <div key={`history_div_${i}`} className="flex flex-row gap-1">
                            <TerminalUserText index={i}/>

                            <p className="w-full bg-transparent outline-none text-zinc-50 font-light caret-transparent">
                                {commandHistory[i]}
                            </p>
                        </div>
                        {responseHistory[i]}
                    </div>
                ))}
            </div>

            <form onSubmit={runCommand} className="flex items-center gap-1">
                <TerminalUserText/>
                
                <div className="relative flex-1">
                    <input 
                        id="terminal-command"
                        type="text"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        autoComplete="off"
                        autoFocus
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className="w-full bg-transparent outline-none text-zinc-50 font-light caret-transparent"
                    />

                    {focused && (
                        <span
                            className="absolute top-0 animate-pulse pointer-events-none text-zinc-50"
                            style={{
                                left: `${command.length}ch`,
                            }}
                        >
                            █
                        </span>
                        )}
                </div>

            </form>
            <div ref={terminalEndRef} />
        </section>
    )
}
