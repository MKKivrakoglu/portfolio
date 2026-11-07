'use client'
import { COLOR_PALETTE } from "@/constants/terminal";
import { ReactNode } from "react";

type ResponseProps = {
    children: ReactNode;
};

export default function TerminalResponse({ children }: ResponseProps) {
    return (
        <div className={`text-md ${COLOR_PALETTE.white}`}>
            {children}
        </div>
    );
}
