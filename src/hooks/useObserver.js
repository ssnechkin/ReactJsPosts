import {useEffect, useRef} from "react";

export const useObserver = (ref, canLoad, isLoading, callback) => {
    const observer = useRef();
    useEffect(() => {
        if (isLoading) return;
        if (observer.current) { // если observer уже создан и в нем что то находится
            observer.current.disconnect(); // отключить наблюдение за всеми наблюдениями, чтобы ниже создать новое наблюдение
        }
        var callback_ = function (entries, observer) {
            if (entries[0].isIntersecting && canLoad) { // не отрабатывает при выходе из зоны видимости
                callback();
            }
        }
        observer.current = new IntersectionObserver(callback_);
        observer.current.observe(ref.current);
    }, [isLoading])
}