const dataURL = "https://api.myjson.com/bins/jcmhn";

let templ, flds;

function handleButton() {
  let re, s, v, str;
  $rslt = $('#result');
  $rslt.empty();
  templ.text.forEach(function(elm) {
    str = elm;
    flds.forEach(function(fld) {
      s = fld.substring(1, fld.length - 1);
      re = RegExp(fld, 'g');
      v = $(`input[name=${s}`).val();
      str = str.replace(re, v);
    });
    $rslt.append(`<div>${str}</div>`);
  });
}

function handleData(data) {
  templ = data;
  let m, re = /{[A-Za-z_$][A-Za-z_$0-9]*?}/g;
  flds = new Set();
  data.text.forEach(function(elm) {do {m = re.exec(elm); if (m) {flds.add(m[0])}} while(m)});
  $elmFormGroup = $(".form-group");
  $elmFormGroup.empty();
  flds.forEach(function(fld){
    s = fld.substring(1, fld.length - 1);
    $elmFormGroup.append($(`<input type="text" class="form-control" name="${s}" placeholder="${s}">`));
  });
  $rslt = $('#result');
  $rslt.empty();
  data.text.forEach(function(elm) {$rslt.append(`<div>${elm}</div>`)});
}

function init() {
	$("#button-fetch").click(handleButton);
  $.getJSON(dataURL)
  .done(handleData)
}

$(document).ready(init);
