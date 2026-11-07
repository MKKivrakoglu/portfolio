
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { COMMAND, COMMAND_DESCRIPTION, RESPONSE, ROUTE_DESCRIPTIONS } from "@/constants/terminal";
import TerminalResponse from "@/components/terminal/TerminalResponse";

const ROUTES = {
    home: "/",
    terminal: "/terminal",
    f1drive: "/f1drive",
} as const;

type CommandHandler = (args: string[]) => ReactNode | null;

type CommandDefinition = {
    description: string;
    execute: CommandHandler;
};

export const WELCOME_RESPONSE = (
    <TerminalResponse>
        <div className="flex flex-col">
            <p className="">
                Welcome to Kemal's Portfolio Terminal
            </p>

            <p className="">
                Interactive portfolio navigation
            </p>

            <div className="" />

            <p className="">
                Type <span className="font-bold">help</span> to see available commands.
            </p>

            <p className="">
                Type <span className="font-bold">ls</span> to list available routes.
            </p>
        </div>
    </TerminalResponse>
);

export function useTerminalCommands(clearTerminal: () => void) {
    const router = useRouter();

    const commands: Record<string, CommandDefinition> = {
        [COMMAND.LIST_DIR]: {
            description: COMMAND_DESCRIPTION[COMMAND.LIST_DIR],
            execute: () => (
                <TerminalResponse>
                    {RESPONSE.LIST_DIR}
                </TerminalResponse>
            ),
        },

        [COMMAND.CLEAR_TERMINAL]: {
            description: COMMAND_DESCRIPTION[COMMAND.CLEAR_TERMINAL],
            execute: () => {
                clearTerminal();
                return null;
            },
        },

        [COMMAND.HELP]: {
            description: COMMAND_DESCRIPTION[COMMAND.HELP],
            execute: () => (
                <TerminalResponse>
                    <div className="flex flex-col gap-1">
                        <p className="mb-2">Available commands:</p>

                        {Object.entries(commands).map(([name, definition]) => (
                            <div key={name} className="flex gap-4">
                                <span className="w-24 shrink-0">
                                    {name}
                                </span>

                                <span>{definition.description}</span>
                            </div>
                        ))}
                    </div>
                </TerminalResponse>
            ),
        },

        [COMMAND.EXPLAIN]: {
            description: COMMAND_DESCRIPTION[COMMAND.EXPLAIN],
            execute: (args) => {
                const route = args[0];

                if (!route || args.length !== 1) {
                    return <TerminalResponse>Usage: explain &lt;route&gt;</TerminalResponse>;
                }

                if (!Object.prototype.hasOwnProperty.call(ROUTES, route)) {
                    return <TerminalResponse>Unknown route: {route}</TerminalResponse>;
                }

                const path = ROUTES[route as keyof typeof ROUTES];
                const description = ROUTE_DESCRIPTIONS[route as keyof typeof ROUTE_DESCRIPTIONS];

                return (
                    <TerminalResponse>
                        <div className="flex gap-4">
                            <span className="w-32 shrink-0">{route} ({path})</span>
                            <span>{description}</span>
                        </div>
                    </TerminalResponse>
                );
            },
        },

        open: {
            description: "Open a route",
            execute: (args) => {
                const route = args[0];

                if (!route) {
                    return (
                        <TerminalResponse>
                            Usage: open &lt;route&gt;
                        </TerminalResponse>
                    );
                }

                if (!(route in ROUTES)) {
                    return (
                        <TerminalResponse>
                            Unknown route: {route}
                        </TerminalResponse>
                    );
                }

                const path = ROUTES[route as keyof typeof ROUTES];

                router.push(path);

                return (
                    <TerminalResponse>
                        Navigating to {path}…
                    </TerminalResponse>
                );
            },
        },
    };

    function executeCommand(input: string): ReactNode | null {
        const [name, ...args] = input.trim().toLowerCase().split(/\s+/);

        const command = commands[name];

        if (!command) {
            return (
                <TerminalResponse>
                    command not found: {name}. Type 'help' for options.
                </TerminalResponse>
            );
        }

        return command.execute(args);
    }

    return { executeCommand };
}
