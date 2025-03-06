var toDoList = []; // 할일 목록을 입력할 배열 객체

while (true) {
  let enter = prompt("<1:입력, 2:삭제, 3:종료>"); // 사용자 입력 받기

  if (enter == 1) {
    // 1을 입력한 경우 -> 할 일 추가
    let txt = prompt("할 일을 입력하세요.");
    toDoList.push(txt);
    console.log("현재1 할 일 목록: ", toDoList);
  } else if (enter == 2) {
    // 삭제할 할일 배열 인덱스를 받을 값을 입력 받기
    let delEnter = prompt("삭제할 할 일의 번호를 입력하세요 (0부터 시작)");
    let delNum = parseInt(delEnter); // 정수로 형 변환

    // index의 값이 배열 내에 존재한다면
    if (toDoList[delNum] != null) {
      toDoList.splice(delNum, 1);
    }
  } else if (enter == 3) {
    // 3을 입력받은 경우 -> 종료
    break; // 반복문 종료
  }
}

console.log("최종 할 일 목록: ", toDoList);
