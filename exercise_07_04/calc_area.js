// 면적 계산 함수
function calculateArea(length, width) {
  return length * width; // 길이와 너비를 곱해서 면적을 계산
}

// 버튼 클릭 시 호출되는 함수
function calculate() {
  // 1. 화면상에서 입력받은 두 입력 값을 메서드를 활용하여 값을 가져온다.
  var width = parseFloat(document.getElementById("wid").value);
  var length = parseFloat(document.getElementById("len").value);
  // -> 실수로 값을 받을 수도 있기 때문에 실수형으로 parseFloat

  // 2. 해당 변수를 면적 계산 함수의 매개변수로 활용하여 호출한다.
  var area = calculateArea(width, length);

  // 3. 결과 값을 리턴한다. -> 출력 요소에 넣어준다. (랜더링)
  document.getElementById("result").innerHTML = area + "제곱미터";
  // 해당 결과 값을 다시 화면상의 출력하는 위치에 랜더링
}
