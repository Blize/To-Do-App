const key = 'BooleanSafeURL';

export function SignedUpAlready(isAuthenticated) {
  console.log(isAuthenticated);
  sessionStorage.setItem(key, JSON.stringify(isAuthenticated));
  return isAuthenticated;
}
