export async function getPreviewImage (file: File): Promise<string> {
  let reader = new FileReader()
  return new Promise((resolve) => {
    reader.onload = (e: any) => e && e.target && resolve(e.target.result)
    reader.readAsDataURL(file)
  })
}

export const addRule = (function (style: any) {
  let sheet = document.head.appendChild(style).sheet
  return function (selector: string, css: any) {
    let propText = Object.keys(css).map(function (p) {
      return p + ':' + css[p]
    }).join(';')
    sheet.insertRule(selector + '{' + propText + '}', sheet.cssRules.length)
    console.log(sheet)
  }
})(document.createElement('style'))

export function download(filename:string, text: string) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export async function upload (file:File): Promise<string> {
  let reader = new FileReader()
  return new Promise((resolve) => {
    reader.onload = (e: any) => e && e.target && resolve(e.target.result)
    reader.readAsText(file)
  })
}
