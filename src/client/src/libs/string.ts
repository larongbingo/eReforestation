
// https://stackoverflow.com/questions/5002111/how-to-strip-html-tags-from-string-in-javascript
export function cleanHTMLString(htmlString: string): string {
  var div = document.createElement("div");
  div.innerHTML = htmlString;
  var text = div.textContent || div.innerText || "";
  return text;
}
