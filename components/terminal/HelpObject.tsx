import { ReactNode } from "react";
import TerminalResponse from "./TerminalResponse";
import { COMMAND_DESCRIPTION } from "@/constants/terminal";


export const helpResponse: ReactNode = (
    <TerminalResponse>
        <div className="flex flex-col">
            <p>Available commands:</p> <br />
            {Object.entries(COMMAND_DESCRIPTION).map(
                ([command, description]) => (
                    <div key={command} className="flex">
                        <span className="w-16 shrink-0">
                            {command}
                        </span>

                        <span>
                            {description}
                        </span>
                    </div>
                )
            )}
        </div>
    </TerminalResponse>
)