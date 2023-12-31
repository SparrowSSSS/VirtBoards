import { FC } from 'react';

interface Props {
    fill: string
};

const Icon25ArrowCursor: FC<Props> = ({fill}) => {
    return (
        <svg width="25" height="25" viewBox="0 0 25 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.13651 25.7375L1.5 31.0079V3.45612L21.1995 21.8759H15.6855H13.1313L14.3755 24.1066C14.8293 24.92 17.6558 30.2501 18.1584 31.3566C18.1582 31.3565 18.1581 31.3564 18.158 31.3564C18.1546 31.3574 18.1848 31.4789 18.177 31.758C18.1681 32.0711 18.1138 32.4558 18.0014 32.839C17.7564 33.6739 17.3637 34.1223 16.9996 34.2576C16.297 34.5186 15.4058 34.5403 14.5946 34.4556C14.327 34.4276 14.0847 34.3899 13.8829 34.3526L9.48374 26.1258L8.5629 24.4038L7.13651 25.7375Z" fill="none" stroke={fill ? fill : "#222222"} strokeWidth="3" />
        </svg>
    )
};

export default Icon25ArrowCursor;