# Testing Guide for Portfolio Improvements

## Prerequisites
✅ Dev server is running (`npm run dev`)
✅ Browser open to `http://localhost:5173` (or your Vite port)

---

## 1. Environment Variable Validation Test

**What to Check:** Console warnings for missing environment variables

**Steps:**
1. Open browser DevTools (F12)
2. Go to the Console tab
3. Look for warning messages about EmailJS configuration

**Expected Result:**
- You should see: `⚠️ EmailJS Configuration Warning: Missing environment variables...`
- This confirms the validation is working

**To Fix:** Copy `.env.example` to `.env` and add your actual EmailJS credentials

---

## 2. Error Boundary Test

**What to Check:** Graceful error handling when components crash

**Method 1: Trigger an Error**
1. Temporarily edit any component to throw an error
2. Example: Add `throw new Error("Test error");` to `Home.jsx`
3. Navigate to the home page

**Expected Result:**
- You should see the ErrorBoundary UI with:
  - Alert triangle icon
  - "Oops! Something went wrong" message
  - "Try Again" button
  - Error details in development mode

**Method 2: Test Recovery**
1. Click the "Try Again" button
2. The error boundary should reset
3. Remove the test error from the code

---

## 3. 404 Not Found Page Test

**What to Check:** Custom 404 page for invalid routes

**Steps:**
1. Navigate to a non-existent route: `http://localhost:5173/this-does-not-exist`
2. Try another: `http://localhost:5173/random-page`

**Expected Result:**
- Custom 404 page appears with:
  - Large "404" text
  - "Page Not Found" heading
  - File question mark icon
  - "Go Home" and "Go Back" buttons
  - Quick links to Projects, Certificates, About, Contact
- Smooth fade-in animation

**Test Actions:**
- Click "Go Home" → should navigate to `/`
- Click "Go Back" → should return to previous page
- Click quick links → should navigate correctly

---

## 4. Keyboard Navigation & Focus Trap Test

**What to Check:** Accessibility improvements for keyboard users

### Test Focus Indicators
**Steps:**
1. Press `Tab` key repeatedly to navigate through the page
2. Observe each focusable element as you tab

**Expected Result:**
- Each interactive element (links, buttons) shows a **sky-blue outline** when focused
- Outline has offset for better visibility
- Focus order is logical (top to bottom, left to right)

### Test Mobile Menu Focus Trap
**Steps:**
1. Resize browser to mobile width (<768px) or use device emulation
2. Click the hamburger menu icon to open mobile menu
3. Press `Tab` key multiple times

**Expected Result:**
- Focus stays **trapped within the mobile menu**
- Tabbing cycles through menu items
- `Shift + Tab` works in reverse
- Press `Escape` key → menu closes
- Click outside the menu → menu closes

---

## 5. PropTypes Validation Test

**What to Check:** Console warnings for prop type mismatches

**Steps:**
1. Open DevTools Console
2. Navigate through different pages
3. Watch for PropTypes warnings

**Expected Result:**
- **No PropTypes warnings** if all props are passed correctly
- If you temporarily pass wrong prop types, you'll see warnings like:
  ```
  Warning: Failed prop type: Invalid prop `toggleMobileMenu` of type `string` 
  supplied to `Navbar`, expected `function`.
  ```

**Components with PropTypes:**
- `Navbar` (toggleMobileMenu: func)
- `MobileMenu` (isOpen: bool, toggleMenu: func)
- `Seo` (title, description, keywords, etc.)
- `LoadingSkeleton` (variant, count, className)

---

## 6. Loading Skeleton Component Test

**What to Check:** Improved loading states

**Steps:**
1. Navigate to the `/projects` page
2. Refresh the page while watching

**Expected Result:**
- While projects are loading, you should see skeleton placeholders
- Skeletons have pulse animation
- Once loaded, skeletons smoothly transition to actual project cards

**Note:** Loading might be very fast on localhost, you may need to throttle network in DevTools to see it

---

## 7. Utilities & Constants Test

**What to Check:** New utility functions work correctly

**Console Test:**
```javascript
// Open DevTools Console and test utilities
// (Note: You'll need to temporarily expose these for testing)

// Date formatting
import { formatDate, formatRelativeTime } from './src/utils/formatting';
formatDate(new Date()) // Should return formatted date

// Number formatting
import { formatNumber, formatCompactNumber } from './src/utils/formatting';
formatNumber(1000000) // "1,000,000"
formatCompactNumber(1000000) // "1M"

// String utilities
import { slugify, toTitleCase } from './src/utils/formatting';
slugify("Hello World!") // "hello-world"
toTitleCase("hello world") // "Hello World"
```

**Practical Test:**
- These utilities are used throughout the app
- If the app loads without errors, utilities are working

---

## 8. Security & Configuration Test

### Test .gitignore
**Steps:**
1. Run: `git status`
2. Check if `.env` file appears in untracked files

**Expected Result:**
- `.env` should **NOT** appear (it's ignored)
- `.env.example` should appear if it's new

### Test .env.example
**Steps:**
1. Open `.env.example`
2. Verify it has all required variables with placeholder values

**Expected Result:**
```bash
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

---

## 9. Visual Regression Testing

**Manual Checks:**

### All Pages Should Work:
- ✅ Home `/`
- ✅ Projects `/projects`
- ✅ Certificates `/certificates`
- ✅ CV `/cv`
- ✅ About `/about`
- ✅ Contact `/contact`
- ✅ Let's Talk `/lets-talk`
- ✅ 404 (any invalid route)

### No Visual Breakage:
- Animations still work smoothly
- Layouts are intact
- Colors and styling unchanged
- Mobile responsive design works

### No Console Errors:
- Open DevTools Console
- Navigate through all pages
- Should see **only warnings** (EmailJS if not configured, CSS linting for Tailwind)
- **No red errors** (except intentional test errors)

---

## 10. Component Health Check

### Files Created (Should Exist):
```
✓ .env.example
✓ src/components/ErrorBoundary.jsx
✓ src/components/LoadingSkeleton.jsx
✓ src/hooks/useFocusTrap.js
✓ src/pages/NotFound.jsx
✓ src/utils/validateEnv.js
✓ src/utils/formatting.js
✓ src/utils/constants.js
```

### Files Modified (Should Have New Code):
```
✓ .gitignore (cleaned up)
✓ src/index.css (focus styles)
✓ src/App.jsx (ErrorBoundary, 404 route, validation)
✓ src/config/email.js (validation warnings)
✓ src/components/Navbar.jsx (PropTypes)
✓ src/components/MobileMenu.jsx (PropTypes, focus trap)
✓ src/components/Seo.jsx (PropTypes)
```

---

## Quick Test Checklist

Use this for rapid verification:

- [ ] App loads without errors
- [ ] All pages navigate correctly
- [ ] Mobile menu opens/closes
- [ ] Mobile menu traps focus
- [ ] Escape key closes mobile menu
- [ ] Tab shows focus indicators
- [ ] 404 page appears for invalid routes
- [ ] Console shows EmailJS warning (if not configured)
- [ ] No unexpected console errors
- [ ] Layouts and styling intact

---

## Debugging Tips

**If something doesn't work:**

1. **Check Console:** First place to look for errors
2. **Check Network Tab:** For failed API calls
3. **Check React DevTools:** For component state issues
4. **Clear Cache:** Sometimes needed after major changes
5. **Restart Dev Server:** `Ctrl+C` then `npm run dev`

---

## Next Steps After Testing

Once you've verified everything works:

1. ✅ Install PropTypes: `npm install prop-types`
2. ✅ Commit your changes
3. ✅ Continue with remaining phases (performance, testing, docs)

---

**Testing completed? Let me know what you find!**
