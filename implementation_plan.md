# Authentication Integration Plan

The goal is to integrate the existing Signin/Signup pages with the rest of the application, ensuring user state is globally accessible and the Account page displays real data.

## User Review Required

> [!NOTE]
> We will be adding a new `AuthContext` to manage user state globally. This will wrap the entire application in `layout.tsx`.

## Proposed Changes

### Context
#### [NEW] [AuthContext.tsx](src/context/AuthContext.tsx)
- Create a React Context to hold `user`, `session`, and `profile` state.
- Use Supabase `onAuthStateChange` to keep state in sync.
- Provide `signOut` method.

### Layout
#### [MODIFY] [layout.tsx](src/app/layout.tsx)
- Import `AuthProvider`.
- Wrap the children (inside `CartProvider`) with `AuthProvider`.

### Components
#### [MODIFY] [StickyHeader.tsx](src/components/ui/StickyHeader.tsx)
- Use `useAuth` hook.
- If user is logged in, show "Account" link (or icon) that links to `/account`.
- If user is logged out, show "Login" link.

#### [MODIFY] [NavigationOverlay.tsx](src/components/ui/NavigationOverlay.tsx)
- Update "Account" link behavior.
- Add "Sign Out" option if logged in.
- Hide "Login" if logged in (or show "Sign Out").

### Pages
#### [MODIFY] [AccountPage](src/app/account/page.tsx)
- Use `useAuth` to get current user.
- If no user, redirect to `/login`.
- Fetch profile data (name, email) from Supabase or Auth Context.
- Replace hardcoded `userProfile` import with real data.

## Verification Plan

### Automated Tests
- None currently exist for frontend components.

### Manual Verification
1.  **Sign Up**: Create a new account via `/signup`. Verify redirection to `/login` (or auto-login if changed) and Profile creation in Supabase.
2.  **Login**: Login with valid credentials. Verify redirection to Home/Dashboard.
3.  **Header State**: Verify `StickyHeader` shows "Account" instead of "Login" after authentication.
4.  **Account Page**: Navigate to `/account`. Verify it shows the correct user name and email.
5.  **Logout**: Click "Sign Out". Verify user is logged out and Header updates to "Login".
6.  **Protection**: Try to access `/account` while logged out. Verify redirection to `/login`.
