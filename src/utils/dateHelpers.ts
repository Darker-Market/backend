export function getTimeUntilExpiry(
  created_at: string,
  expires_at: string
): string {
  const now = new Date(created_at);
  const expires = new Date(expires_at);

  const msDiff = expires.getTime() - now.getTime();

  if (msDiff <= 0) return "Expired";

  const minutes = Math.floor(msDiff / (1000 * 60)) % 60;
  const hours = Math.floor(msDiff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));

  return `Expires in ${days}d ${hours}h ${minutes}m`;
}
