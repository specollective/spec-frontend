export default function StatBox({ height, width, className, children }) {
    return (
        <div
            className={`${className} flex flex-col  ${height} ${width} justify-center text-center p-4`}
        >
            {/* <p className={`text-${statColor} text-7xl font-semibold mb-5`}>{inputStat}</p> */}
            {children}
        </div>
    );
}