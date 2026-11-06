export default function TerminalUserText({index}: {index?: number}) {
    return (
        <label key={index ? `history_label_${index}` : null} htmlFor={`terminal-command-${index}`} className="shrink-0">user@portfolio
            <span className="text-zinc-50">:</span>
            <span className="text-blue-500">~</span>$
        </label>
    )
}