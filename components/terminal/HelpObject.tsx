import { ReactNode } from "react";
import TerminalResponse from "./TerminalResponse";
import { COMMAND_DESCRIPTION } from "@/constants/terminal";


export const helpResponse: ReactNode = (
    <TerminalResponse>
        <div className="flex flex-col gap-1">
            <p className="mb-2">Available commands:</p>

            {Object.entries(COMMAND_DESCRIPTION).map(
                ([command, description]) => (
                    <div key={command} className="flex gap-4">
                        <span className="text-zinc-300 w-16 shrink-0">
                            {command}
                        </span>

                        <span className="font-bold">
                            {description}
                        </span>
                    </div>
                )
            )}
        </div>
    </TerminalResponse>
)