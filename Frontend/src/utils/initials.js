// Initials for the signed-in user's avatar: from the name when there is one,
// otherwise the first letter of the email address.
export function getUserInitials(user) {
  if (!user) return '';
  const name = user.name?.trim();
  if (name) {
    return name
      .split(/\s+/)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }
  return (user.email?.[0] || '?').toUpperCase();
}
