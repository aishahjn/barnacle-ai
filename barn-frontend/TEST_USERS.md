# 🧪 Test Users for Barnacle Authentication

## Available Test Accounts

You can use any of these pre-configured test accounts to login and test the authentication system:

### 👑 **Administrator Account**

- **Email**: `admin@barnacle.com`
- **Password**: `admin123`
- **Name**: John Doe
- **Role**: Administrator

### 🚢 **Ship Captain Account**

- **Email**: `captain@barnacle.com`
- **Password**: `captain123`
- **Name**: Sarah Wilson
- **Role**: Ship Captain

### ⚓ **Fleet Operator Account**

- **Email**: `operator@barnacle.com`
- **Password**: `operator123`
- **Name**: Mike Johnson
- **Role**: Fleet Operator

### 🎯 **Demo User Account**

- **Email**: `demo@barnacle.com`
- **Password**: `demo123`
- **Name**: Demo User
- **Role**: Demo User

## 🎮 How to Test

### Quick Test Steps:

1. **Start your development server**: `npm run dev`
2. **Navigate to Login page**: Click "Login" in the NavBar
3. **Use any test account above**
4. **Watch the magic happen**:
   - NavBar updates with user profile
   - Statistics page becomes available
   - User avatar shows initials
   - Profile dropdown works

### 🔄 Test Different Scenarios:

#### **Basic Login Flow**

```
Email: admin@barnacle.com
Password: admin123
✅ Should login successfully and show "JD" avatar
```

#### **Remember Me Feature**

```
✅ Check "Remember me"
✅ Login with any account
✅ Refresh page - should stay logged in
```

#### **Error Handling**

```
Email: wrong@email.com
Password: wrongpass
❌ Should show error message
```

#### **Logout Flow**

```
✅ Click user avatar in NavBar
✅ Click "Sign Out"
✅ Should logout and return to guest state
```

## 🔧 Technical Details

### Mock Authentication Features:

- **1 second delay** to simulate real API calls
- **Proper error handling** for wrong credentials
- **Token generation** with realistic format
- **Remember me** functionality with localStorage/sessionStorage
- **Session persistence** across page refreshes

### Test Data Storage:

- All test users are stored in memory
- Passwords are checked against mock database
- User data persists during the session
- Tokens are generated dynamically

## 🚀 Testing Different Roles

Each user has a different role that will be displayed in the NavBar:

- **Administrator** → Full access, admin badge
- **Ship Captain** → Captain-specific features
- **Fleet Operator** → Fleet management access
- **Demo User** → Limited demo access

## 📱 Mobile Testing

All test accounts work on mobile devices too:

- Responsive NavBar updates
- Touch-friendly profile dropdown
- Mobile-optimized authentication flow

## 🔄 Switching Between Accounts

You can quickly test different accounts:

1. **Logout** from current account
2. **Login** with different test credentials
3. **See different user profiles** in NavBar
4. **Test role-based features**

## ⚡ Quick Copy-Paste Credentials

For fast testing, here are the credentials ready to copy:

**Admin**: `admin@barnacle.com` / `admin123`
**Captain**: `captain@barnacle.com` / `captain123`  
**Operator**: `operator@barnacle.com` / `operator123`
**Demo**: `demo@barnacle.com` / `demo123`

## 🛠️ For Developers

### Mock System Configuration:

- Located in: `src/redux/Slices/userSlice.js`
- Flag: `USE_MOCK_API = true`
- To switch to real API: Set `USE_MOCK_API = false`

### Adding New Test Users:

```javascript
// Add to MOCK_USERS array in userSlice.js
{
  id: 5,
  email: 'newuser@barnacle.com',
  password: 'password123',
  firstName: 'New',
  lastName: 'User',
  role: 'Custom Role',
  avatar: null
}
```

## 🎯 Expected Behavior

### ✅ **Success Indicators:**

- NavBar shows user avatar with initials
- User name appears next to avatar
- Role is displayed under name
- Statistics page becomes visible
- Profile dropdown works
- Logout functions correctly

### ❌ **Error Indicators:**

- Red error message for wrong credentials
- Loading states during authentication
- Graceful error handling

## 🔐 Security Notes

This is a **mock authentication system** for testing only:

- Passwords are stored in plain text (never do this in production!)
- Tokens are simple strings (use JWT in production)
- No real security validation (implement proper auth in production)

**Perfect for testing the UI and authentication flow!** 🎉

---

**Start testing now** - pick any account above and enjoy the seamless authentication experience! ✨
