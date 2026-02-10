# Admin Role System - Test Suite

## ✅ Tests Created

### 1. **Role Utilities Tests** (`src/lib/auth/__tests__/roles.test.ts`)
Tests for server-side role checking functions:
- ✅ `getUserProfile()` - Get current user's profile
- ✅ `isAdmin()` - Check if current user is admin
- ✅ `isUserAdmin(userId)` - Check if specific user is admin
- ✅ `requireAdmin()` - Require admin access (throws error if not)
- ✅ `isAdminRole(role)` - Client-side role check

**Coverage**: 5 functions, 15 test cases

### 2. **useUserRole Hook Tests** (`src/hooks/__tests__/useUserRole.test.ts`)
Tests for client-side React hook:
- ✅ Returns null when not authenticated
- ✅ Returns customer profile for regular users
- ✅ Returns admin profile for admin users
- ✅ Handles errors gracefully
- ✅ Sets up auth state change listener
- ✅ Cleans up subscription on unmount

**Coverage**: 1 hook, 6 test cases

### 3. **Middleware Integration Tests** (`src/lib/supabase/__tests__/middleware.test.ts`)
Tests for admin route protection:
- ✅ Allows admin users to access `/admin` routes
- ✅ Redirects non-admin users from `/admin` routes
- ✅ Redirects unauthenticated users to login
- ✅ Allows access to public routes without authentication

**Coverage**: 1 middleware function, 4 test cases

## 📊 Total Test Coverage
- **Total Tests**: 25 test cases
- **Files Covered**: 3 core files
- **Test Types**: Unit tests + Integration tests

## 🧪 Running the Tests

### Install Jest Dependencies (if not already installed)
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm test:watch
```

### Run Tests with Coverage Report
```bash
npm test:coverage
```

### Run Specific Test File
```bash
npm test -- roles.test
npm test -- useUserRole.test
npm test -- middleware.test
```

## 🎯 Test Scenarios Covered

### Authentication States
- ✅ Not authenticated (no user)
- ✅ Authenticated as customer
- ✅ Authenticated as admin

### Role Checks
- ✅ Admin role verification
- ✅ Customer role verification
- ✅ Null/undefined role handling

### Error Handling
- ✅ Auth errors
- ✅ Database errors
- ✅ Missing profile errors

### Route Protection
- ✅ Admin-only routes
- ✅ Public routes
- ✅ Authenticated routes
- ✅ Redirect logic

## 📝 Test Best Practices Used

1. **Mocking**: All Supabase clients are mocked to avoid real database calls
2. **Isolation**: Each test is independent and doesn't affect others
3. **Coverage**: Both success and error paths are tested
4. **Cleanup**: Proper cleanup in `beforeEach` hooks
5. **Assertions**: Clear, specific assertions for each test case

## 🔍 What's Tested

### ✅ Covered
- Role checking logic
- Authentication state management
- Middleware protection
- Error handling
- React hook lifecycle
- Subscription cleanup

### ⚠️ Not Covered (Future Enhancements)
- E2E tests for actual admin dashboard
- Browser-based navigation tests
- Real database integration tests
- Performance tests

## 🐛 Known Issues
- TypeScript lint errors for Jest types (install `@types/jest` to fix)
- Tests require proper Jest configuration (already set up in `jest.config.js`)

## 📚 Next Steps

1. **Install Jest types** (optional, for better IDE support):
   ```bash
   npm install --save-dev @types/jest
   ```

2. **Run tests** to verify everything works:
   ```bash
   npm test
   ```

3. **Add to CI/CD**: Include tests in your deployment pipeline

4. **Monitor coverage**: Aim for >80% coverage on critical auth code

---

**Created**: Feb 10, 2026  
**Test Framework**: Jest + React Testing Library  
**Total Test Cases**: 25
