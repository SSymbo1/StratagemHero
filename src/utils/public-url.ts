/**
 * 根据 Vite base 生成 public 目录资源的访问路径。
 * @param resourcePath 不带前导斜杠的 public 资源相对路径。
 * @returns 带部署 base 的资源访问路径。
 */
export function withPublicUrl(resourcePath: string): string {
  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`

  return `${baseUrl}${resourcePath.replace(/^\/+/, '')}`
}
