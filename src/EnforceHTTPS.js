import { useEffect } from "react";

const EnforceHTTPS = () => {
    useEffect(() => {
        // localhost에서는 HTTPS 강제 적용하지 않음
        if (window.location.protocol === "http:" && window.location.hostname !== "localhost") {
            window.location.href = window.location.href.replace("http:", "https:");
        }
    }, []);

    return null;
};

export default EnforceHTTPS;
