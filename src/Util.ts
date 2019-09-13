export async function getPreviewImage (file: File): Promise<string> {
  let reader = new FileReader()
  return new Promise((resolve) => {
    reader.onload = (e: any) => e && e.target && resolve(e.target.result)
    reader.readAsDataURL(file)
  })
}
