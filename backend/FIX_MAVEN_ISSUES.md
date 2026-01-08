# Fix Maven Dependency Issues

## Problem
Maven is trying to download Quarkus 3.8.0 which doesn't exist, and has cached the failure.

## Solution Steps

### Step 1: Clear Maven Cache

Run these commands in PowerShell (in the `backend` folder):

```powershell
# Clear Maven local repository cache for Quarkus
Remove-Item -Recurse -Force "$env:USERPROFILE\.m2\repository\io\quarkus" -ErrorAction SilentlyContinue

# Or clear entire Maven cache (more thorough)
# Remove-Item -Recurse -Force "$env:USERPROFILE\.m2\repository" -ErrorAction SilentlyContinue
```

### Step 2: Update Quarkus Version

The `pom.xml` has been updated from version `3.8.0` to `3.6.0` (stable version).

### Step 3: Force Update Dependencies

Run this command to force Maven to update dependencies:

```powershell
mvn clean install -U
```

The `-U` flag forces Maven to update dependencies.

### Step 4: Run Quarkus Dev Mode

After dependencies are downloaded:

```powershell
mvn quarkus:dev
```

---

## Alternative: Use Maven Wrapper

If you don't have Maven wrapper, you can generate it:

```powershell
mvn wrapper:wrapper
```

Then use:
```powershell
.\mvnw.cmd quarkus:dev
```

---

## If Issues Persist

1. **Check Internet Connection**: Maven needs to download from Maven Central
2. **Check Proxy Settings**: If behind corporate firewall, configure Maven proxy
3. **Try Different Quarkus Version**: 
   - 3.5.0
   - 3.4.0
   - 3.3.0

Update in `pom.xml` line 18:
```xml
<quarkus.platform.version>3.5.0</quarkus.platform.version>
```
