import { useEffect, useState } from "react";

type CountUpProps = {
    value: number;
};

function CountUp({ value }: CountUpProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let current = 0;

        const interval = setInterval(() => {
            current += 1;

            if (current >= value) {
                setCount(value);
                clearInterval(interval);
                return;
            }

            setCount(current);
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [value]);

    return <span>{count}</span>;
}

export default CountUp;