import { FC } from "react";

export interface IButtonTableMore {
    onClick?: VoidFunction;
    color?: string;
    width?: number;
    height?: number;
    rotate?: boolean;
}

const ButtonTableMore: FC<IButtonTableMore> = ({ onClick, rotate, color, width = 33, height = 37 }) => (
    <button
        type="button"
        onClick={onClick}
        style={(rotate) ? { cursor:"pointer", backgroundColor: "transparent", border: "none",  transform: 'rotate(180deg)', transition:'transform .6s'} : {cursor:"pointer", backgroundColor: "transparent", border: "none", transition:'transform .6s' }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 33 37" fill="none">
            <path d="M14.8215 24.5118C15.4724 25.1627 16.5276 25.1627 17.1785 24.5118L27.7851 13.9052C28.436 13.2544 28.436 12.1991 27.7851 11.5482C27.1342 10.8973 26.079 10.8973 25.4281 11.5482L16 20.9763L6.57191 11.5482C5.92103 10.8973 4.86576 10.8973 4.21489 11.5482C3.56401 12.1991 3.56401 13.2544 4.21489 13.9052L14.8215 24.5118ZM14.3333 22V23.3333H17.6667V22H14.3333Z" fill={color || "#0E0E0E"} />
        </svg>
    </button>
);

export default ButtonTableMore;