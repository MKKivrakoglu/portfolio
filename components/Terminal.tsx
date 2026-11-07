'use client'

import { FormEvent, KeyboardEvent, ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react"
import TerminalUserText from "./terminal/TerminalUserText";
import { useTerminalCommands, WELCOME_RESPONSE } from "@/hooks/useTerminalCommands";

import { JetBrains_Mono } from "next/font/google";
import { COLOR_PALETTE, FONT_WEIGHT } from "@/constants/terminal";

const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export default function Terminal() {
    const [command, setCommand] = useState("")
    const [focused, setFocused] = useState(true)
    const [commandCounter, setCommandCounter] = useState(0)
    const [commandHistory, setCommandHistory] = useState<string[]>([])
    // Hard wird nicht gecleared. Nur bei Reload der Seite
    const [commandHistoryHard, setCommandHistoryHard] = useState<string[]>([])
    const [responseHistory, setResponseHistory] = useState<ReactNode[]>([])
    const [showWelcome, toggleShowwelcome] = useState<boolean>(true)
    const [cursorPosition, setCursorPosition] = useState(0);
    const [historyIndex, setHistoryIndex] = useState<number | null>(null)
    const [draftCommand, setDraftCommand] = useState("")

    const { executeCommand } = useTerminalCommands(clearTerminal)

    const terminalEndRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        terminalEndRef.current?.scrollIntoView({
            block: "end"
        });
    }, [commandCounter]);

    function runCommand(event: FormEvent<HTMLElement>) {
        event.preventDefault()
        
        const input = command.trim()

        setHistoryIndex(null)
        setDraftCommand("")

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
        setCommandHistoryHard(prev => [...prev, command])
        setResponseHistory(prev => [...prev, result])

        setCommand("")
        setCursorPosition(0)
    }

    function clearTerminal() {
        setCommand("")
        setCommandCounter(0)
        setCommandHistory([])
        setResponseHistory([])
        setHistoryIndex(null)
        setDraftCommand("")
        toggleShowwelcome(false)

        // Clear kommt auch in die history
        setCommandHistoryHard(prev => [...prev, command])
    }

    function navigateHistory(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return

        const history = commandHistoryHard.filter((entry) => entry.trim() !== "")
        if (history.length === 0) return

        event.preventDefault()

        if (event.key === "ArrowUp") {
            if (historyIndex === null) {
                setDraftCommand(command)
                setHistoryCommand(history.length - 1, history)
            } else if (historyIndex > 0) {
                setHistoryCommand(historyIndex - 1, history)
            }

            return
        }

        if (historyIndex === null) return

        if (historyIndex < history.length - 1) {
            setHistoryCommand(historyIndex + 1, history)
        } else {
            setHistoryIndex(null)
            setCommand(draftCommand)
            setCursorPosition(draftCommand.length)
        }
    }

    function setHistoryCommand(index: number, history: string[]) {
        const historyCommand = history[index]

        setHistoryIndex(index)
        setCommand(historyCommand)
        setCursorPosition(historyCommand.length)
    }

    return (
        <section 
            className={`w-full p-4 ${jetBrainsMono.className} text-md ${FONT_WEIGHT} 
                ${COLOR_PALETTE.background} ax-h-[500px] overflow-y-auto`}
            aria-label="Portfolio navigation terminal"
        >
            <div className="flex flex-col">
                {showWelcome && WELCOME_RESPONSE}

                {Array.from( { length: commandCounter }, (_, i) => (
                    <div key={`history_outer_div_${i}`}>
                        <div key={`history_div_${i}`} className="flex flex-row gap-1">
                            <TerminalUserText index={i}/>

                            <p className="w-full bg-transparent outline-none caret-transparent">
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
                        onChange={(e) => {
                            const nextCommand = e.target.value
                            setCommand(nextCommand)
                            if (historyIndex !== null) setHistoryIndex(null)
                            setDraftCommand(nextCommand)
                            setCursorPosition(e.target.selectionStart ?? 0);
                        }}
                        onSelect={(e) => {
                            setCursorPosition(e.currentTarget.selectionStart ?? 0);
                        }}
                        onKeyDown={navigateHistory}
                        autoComplete="off"
                        autoFocus
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        className="w-full bg-transparent outline-none caret-transparent"
                    />

                    {focused && (
                        <span
                            aria-hidden="true"
                            className="absolute top-0 animate-pulse h-full pointer-events-none bg-[#D1D5DB]"
                            style={{
                                left: `calc(${cursorPosition}ch + ${cursorPosition * 0.01}em + 0.1em)`,
                                width: "0.5em",
                                height: "1.15em",
                                top: "0.1em"
                            }}
                            />
                        )}
                </div>

            </form>
            <div ref={terminalEndRef} />    
        </section>
    )
}
