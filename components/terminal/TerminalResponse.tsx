'use client'
import { ReactNode } from "react";

type ResponseProps = {
    children: ReactNode;
};

export default function TerminalResponse({ children }: ResponseProps) {
    return (
        <div className="-my-1 text-sm text-zinc-200 font-normal">
            {children}
        </div>
    );
}