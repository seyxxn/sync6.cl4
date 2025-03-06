let length = 5; // 별 찍으려는 피라미드 층 수

for (var i = 1; i <= length; i++) {
  var txt = "";

  for (var j = 1; j <= i; j++) {
    txt = txt + "*";
  }

  console.log(txt);
}
