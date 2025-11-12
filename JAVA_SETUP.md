# Java Setup for Allure Reports

## The Issue
You're seeing this error:
```
This version of C:\Program Files\Microsoft\jdk-17.0.16+8\bin\java.exe is not compatible 
with the version of Windows you're running.
```

This happens when you have a 64-bit Java installation but are running 32-bit PowerShell/Command Prompt, or vice versa.

## Solutions

### Option 1: Install Correct Java Version (Recommended)

1. **Check your Windows architecture:**
   - Press `Win + X` and select "System"
   - Look for "System type" - it will say "64-bit operating system" or "32-bit operating system"

2. **Download the matching Java:**
   - For 64-bit Windows: Download Java 17 (x64) from https://adoptium.net/
   - For 32-bit Windows: Download Java 17 (x86) from https://adoptium.net/

3. **Install Java:**
   - Run the installer
   - Check "Set JAVA_HOME variable"
   - Check "Add to PATH"

4. **Verify installation:**
   ```powershell
   java -version
   ```

### Option 2: Use Node.js Allure Package (Easiest)

If you want to avoid Java issues completely, use the Node.js version:

```powershell
npm install -g allure-commandline
```

Then verify:
```powershell
allure --version
```

### Option 3: Use Correct Terminal

If you have both 32-bit and 64-bit Java installed:

- For 64-bit Java: Use 64-bit PowerShell (default)
- For 32-bit Java: Use 32-bit PowerShell at `C:\Windows\SysWOW64\WindowsPowerShell\v1.0\powershell.exe`

## Verification

After fixing Java, test Allure:

```powershell
# Run tests to generate results
npm test

# Generate and open report
npm run allure:report
```

## Alternative: Use Online CI/CD Reports

If local Allure setup is problematic, consider:
- GitHub Actions with Allure reporting
- GitLab CI with Allure plugin
- Jenkins with Allure plugin

These platforms have Java pre-installed and handle reports automatically.
