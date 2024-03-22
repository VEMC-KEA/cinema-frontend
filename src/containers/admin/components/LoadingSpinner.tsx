import { SpinnerDotted } from "spinners-react";

function LoadingSpinner({ size }: { size?: number }) {
    return (
        <SpinnerDotted
            size={size ? size : 60}
            thickness={180}
            speed={157}
            color="rgba(172, 57, 59, 1)"
        />
    );
}

export default LoadingSpinner;
