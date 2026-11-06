export const COMMAND = {
    LIST_DIR: "ls",
    CLEAR_TERMINAL: "clear",
    HELP: "help"
} as const;

export const COMMAND_DESCRIPTION: Record<string, string> = {
    [COMMAND.LIST_DIR]: "List all available routes",
    [COMMAND.CLEAR_TERMINAL]: "Clear the terminal history",
    [COMMAND.HELP]: "Show all available commands"
};

export const RESPONSE = {
    STD: `"${COMMAND.LIST_DIR}" to see available routes`,
    LIST_DIR: "Available routes: home, f1drive",
}