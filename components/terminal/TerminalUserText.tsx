import { COLOR_PALETTE, FONT_WEIGHT } from "@/constants/terminal";


export default function TerminalUserText({index}: {index?: number}) {
    return (
        <label 
            key={index ? `history_label_${index}` : null} 
            htmlFor={`terminal-command-${index}`} 
            className={`shrink-0 ${FONT_WEIGHT}`}
            >
            <span className={COLOR_PALETTE.green}>user@portfolio</span>:
            <span className={COLOR_PALETTE.violet}>~</span>$
        </label>
    )
}
