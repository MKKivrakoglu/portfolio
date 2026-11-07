export const COMMAND = {
    LIST_DIR: "ls",
    CLEAR_TERMINAL: "clear",
    HELP: "help",
    EXPLAIN: "explain",
} as const;

export const COMMAND_DESCRIPTION: Record<string, string> = {
    [COMMAND.LIST_DIR]: "List all available routes",
    [COMMAND.CLEAR_TERMINAL]: "Clear the terminal history",
    [COMMAND.HELP]: "Show all available commands",
    [COMMAND.EXPLAIN]: "Describe a route",
};

export const RESPONSE = {
    STD: `"${COMMAND.LIST_DIR}" to see available routes`,
    LIST_DIR: "Available routes: home, terminal, f1drive",
}

export const ROUTE_DESCRIPTIONS = {
    home: "The portfolio home page with the interactive terminal.",
    terminal: "A dedicated page for exploring the portfolio through terminal commands.",
    f1drive: "A full-screen Formula 1 driving sequence controlled by scrolling.",
} as const;

export const COLOR_PALETTE = {
    green: "text-[#6AC44B]",
    violet: "text-[#6468ED]",
    white: "text-white",
    background: "bg-[#1E1E1E]",
}

export const FONT_WEIGHT = "font-semibold"
