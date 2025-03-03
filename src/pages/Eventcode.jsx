import React, { useState, useContext } from "react";
import AdminContext from "../AdminContext";

const Eventcode = () => {
    const { setIscode } = useContext(AdminContext);
    const [inputCode, setInputCode] = useState("");

    const handleCodeSubmit = () => {
        if (inputCode.trim() === "") {
            alert("코드를 입력해주세요!");
            return;
        }

        setIscode(inputCode);
        alert("이벤트 코드가 설정되었습니다!");
    };

    return (
        <div>
            <h2>이벤트 코드 입력</h2>
            <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="이벤트 코드를 입력하세요"
            />
            <button onClick={handleCodeSubmit}>코드 설정</button>
        </div>
    );
};

export default Eventcode;
