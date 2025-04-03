// 영어 요일을 한글로 변환하는 함수
const convertEnglishToKoreanDays = studyDays => {
  if (!studyDays || !Array.isArray(studyDays)) return [];

  const dayMapping = {
    Monday: "월요일",
    Tuesday: "화요일",
    Wednesday: "수요일",
    Thursday: "목요일",
    Friday: "금요일",
    Saturday: "토요일",
    Sunday: "일요일",
    MON: "월요일",
    TUE: "화요일",
    WED: "수요일",
    THU: "목요일",
    FRI: "금요일",
    SAT: "토요일",
    SUN: "일요일",
  };

  return studyDays.map(dayString => {
    const parts = dayString.split(" "); // 요일과 시간을 분리
    if (parts.length < 2) return dayString; // 형식이 다르면 원본 유지

    const engDay = parts[0]; // 영어 요일
    const time = parts.slice(1).join(" "); // 나머지 시간
    const korDay = dayMapping[engDay] || engDay; // 한글 요일 변환

    return `${korDay} ${time}`;
  });
};

export {convertEnglishToKoreanDays};
