import {useEffect, useRef} from "react";
const useIntersectionObserver = (callback: () => void, trackedItems: any) => {
    const triggerRef = useRef<HTMLDivElement>(null);

    const checkIfPageIsFilled = () => {
        if (triggerRef.current && triggerRef.current.getBoundingClientRect().top < window.innerHeight) {
            callback();
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        callback();
                    }
                });
            },
            {
                threshold: 1,
            }
        );

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        // Проверка, если данные уже загрузились и элемент на экране
        checkIfPageIsFilled();

        return () => {
            if (observer && triggerRef.current) {
                observer.unobserve(triggerRef.current);
            }
        };
    }, [callback]);

    useEffect(() => {
        if (trackedItems?.length) {
            checkIfPageIsFilled();
        }
    }, [trackedItems]);

    return { triggerRef };
};

export default useIntersectionObserver