# Authentication Integration

- [x] Create `AuthContext`
    - [x] Create `src/context/AuthContext.tsx` with Supabase client integration
    - [x] Implement `AuthProvider` and `useAuth` hook
- [x] Update Root Layout
    - [x] Wrap application with `AuthProvider` in `src/app/layout.tsx`
- [x] Integrate Auth in Navigation
    - [x] Update `StickyHeader.tsx` to show Login/Account based on auth state
    - [x] Update `NavigationOverlay.tsx` to handle Sign Out and dynamic links
- [x] Connect Account Page to Real Data
    - [x] Fetch user profile in `src/app/account/page.tsx`
    - [x] Replace mock data with real user data
- [x] Verification
    - [x] Verify Sign Up flow
    - [x] Verify Login flow
    - [x] Verify Logout
    - [x] Verify Protected Routes (Account page redirection if not logged in)
