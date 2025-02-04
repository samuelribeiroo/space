export function publishDateFormatter(publishDate:  string | Date): string {
  return new Date(publishDate).toLocaleDateString('pt-br', {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}