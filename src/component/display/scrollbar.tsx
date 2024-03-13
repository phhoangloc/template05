
import "../style/style.css"

type Props = {
    scrTop: number,
    scrHeight: number,
    onScroll: boolean
}

const Scrollbar = ({ scrTop, scrHeight, onScroll }: Props) => {

    return (
        <div className="scroll_bar" style={{ opacity: onScroll ? 0.5 : 0 }}>
            <div className="scroll_bar_thumb" style={{ top: ((scrTop) / (scrHeight)) * 100 + "%", height: ((550) / scrHeight) * 100 + "%" }}></div>
        </div>
    )
}

export default Scrollbar