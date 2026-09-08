# Assignment 3: Build Automation Using Jenkins

A complete Ubuntu guide covering both **manual** and **automated (Jenkins)** build methods for the Student Task Manager project.

## Overview

**Method 1 — Manual Build**

```
Project → npm install → npm run build → SUCCESS
```

**Method 2 — Automated Build Using Jenkins**

```
GitHub Repository → Jenkins clones repository → npm install → npm run build → SUCCESS / FAILURE
```

---

## Part 0: Check Your Ubuntu System

Open Terminal with `Ctrl + Alt + T`, then update Ubuntu:

```bash
sudo apt update
sudo apt upgrade -y
```

---

## Part 1: Install Required Software

You need: Git, Node.js, npm, Java, and Jenkins.

### Step 1 — Install Git

```bash
sudo apt install git -y
git --version
```

Expected output: `git version 2.x.x`

### Step 2 — Install Node.js and npm

```bash
sudo apt install nodejs npm -y
node --version
npm --version
```

Expected output: something like `v20.x.x` and `10.x.x`

> 📸 Take a screenshot showing Node.js and npm versions.

### Step 3 — Install Java

Jenkins requires Java.

```bash
sudo apt install fontconfig openjdk-21-jre -y
java -version
```

---

## Part 2: Create Your Project

```bash
cd ~
mkdir devops-task-manager
cd devops-task-manager
code .
```

### Step 4 — Verify Project Files

Expected structure:

```
devops-task-manager/
├── public/
│   └── index.html
├── app.js
├── build.js
├── package.json
└── .gitignore
```

Check:

```bash
ls
ls public
```

You should see `app.js`, `build.js`, `package.json`, `public` at the top level, and `index.html` inside `public`.

---

## Part 3: Run the Project Manually

### Step 5 — Install Dependencies Manually

```bash
pwd
npm install
```

`pwd` should show something like `/home/YOUR_USERNAME/devops-task-manager`.

After `npm install`, you should see new `node_modules` and `package-lock.json` entries.

### Step 6 — Test the Application Manually

```bash
npm start
```

Expected output:

```
Student Task Manager is running at http://localhost:3000
```

Open `http://localhost:3000` in your browser and test:

1. Enter a task.
2. Click **Add Task**.
3. Verify the task appears.
4. Click **Delete**.
5. Verify the task disappears.

> 📸 Take a screenshot of the running application.

### Step 7 — Stop the Application

Press `Ctrl + C` in the terminal.

### Step 8 — Run the Build Manually

```bash
npm run build
```

Expected output:

```
Starting application build validation...
Application files validated successfully.
Build completed successfully.
```

> 📸 Take a screenshot showing `npm install`, `npm run build`, and the successful output.

**This is your manual build demonstration.** Explanation to give:

> "In the manual approach, I manually execute the build commands. First, I run `npm install` to install the application dependencies. Then I run `npm run build`, which executes `build.js` and validates the required application files."

---

## Part 4: Create a GitHub Repository

### Step 9 — Create a New Repository

On GitHub: **+ → New repository**

- Repository name: `devops-task-manager`
- Visibility: Public
- Do **not** initialize with a README

Click **Create repository** and copy the repository URL (e.g. `https://github.com/YOUR_USERNAME/devops-task-manager.git`).

### Step 10 — Configure Git

```bash
pwd
git init
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
git config --global --list
```

Use the email associated with your GitHub account.

### Step 11 — Check `.gitignore`

```bash
cat .gitignore
```

Expected content:

```
node_modules/
```

This prevents uploading unnecessary dependencies.

### Step 12 — Add Files to Git

```bash
git add .
git status
```

You should see `app.js`, `build.js`, `package.json`, `package-lock.json`, `public/index.html`.

⚠️ You should **not** see thousands of `node_modules` files.

### Step 13 — Commit

```bash
git commit -m "Initial Student Task Manager application"
```

### Step 14 — Set the Main Branch

```bash
git branch -M main
```

### Step 15 — Connect GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/devops-task-manager.git
git remote -v
```

### Step 16 — Push to GitHub

```bash
git push -u origin main
```

Authenticate if prompted. After success, refresh your GitHub repository — you should see all project files.

> 📸 Take a screenshot of the GitHub repository.

---

## Part 5: Install Jenkins on Ubuntu

### Step 17 — Install Jenkins

Confirm Java is installed:

```bash
java -version
```

Add the Jenkins repository key and source:

```bash
sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc \
https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key

echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc]" \
https://pkg.jenkins.io/debian-stable binary/ | \
sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update
sudo apt install jenkins -y
```

### Step 18 — Start Jenkins

```bash
sudo systemctl start jenkins
sudo systemctl enable jenkins
sudo systemctl status jenkins
```

You should see `active (running)`. Press `q` to exit the status screen.

### Step 19 — Open Jenkins

Go to `http://localhost:8080` — you should see the **Unlock Jenkins** screen.

### Step 20 — Get the Initial Admin Password

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Copy the password, paste it into Jenkins, and click **Continue**.

### Step 21 — Install Plugins

Select **Install suggested plugins** and wait for installation.

### Step 22 — Create Admin User

Fill in username, password, name, and email, then click **Save and Continue**.

### Step 23 — Confirm Jenkins URL

For a local installation, this should be `http://localhost:8080/`. Click **Save and Finish**, then **Start using Jenkins**.

> 📸 Take a screenshot of the Jenkins Dashboard.

---

## Part 6: Give Jenkins Access to Node and npm

Jenkins runs as the `jenkins` user, so it needs its own access to Node and npm.

```bash
which node
which npm
sudo -u jenkins node --version
sudo -u jenkins npm --version
```

If both commands return version numbers, Jenkins has the access it needs.

---

## Part 7: Create the Jenkins Freestyle Project

### Step 24 — Enter Project Name

Jenkins Dashboard → **New Item**

- Name: `task-manager-build`
- Type: **Freestyle project**
- Click **OK**

---

## Part 8: Connect Jenkins to GitHub

### Step 25 — Enter Repository URL

Under **Source Code Management**, select **Git** and enter your repository URL, e.g.:

```
https://github.com/YOUR_USERNAME/devops-task-manager.git
```

### Step 26 — Configure Branch

Under **Branches to build**, enter:

```
*/main
```

If your repository is public, leave **Credentials** as **None**.

---

## Part 9: Configure Automated Build Commands

### Step 27 — Add Build Step

Scroll to **Build Steps → Add build step → Execute shell**, and enter:

```bash
npm install
npm run build
```

> 📸 Take a screenshot of the build step configuration.

### Step 28 — Save

Click **Save** to return to the project page.

---

## Part 10: Run the Automated Build

### Step 29 — Click Build Now

Click **Build Now**. A new build (e.g. `#1`) will appear.

### Step 30 — Check Console Output

Click the build number, then **Console Output**. You should see something like:

```
Started by user
Cloning the remote Git repository
...
npm install
...
npm run build
Starting application build validation...
Application files validated successfully.
Build completed successfully.
Finished: SUCCESS
```

**This is your automated build.** Jenkins automatically:

1. Connects to GitHub.
2. Clones your repository.
3. Creates/uses its Jenkins workspace.
4. Executes `npm install`.
5. Executes `npm run build`.
6. Displays the result.

The assignment expects Jenkins to retrieve the source, install Node.js dependencies, execute the build, and analyze the Console Output/build status.

> 📸 Take a screenshot of the complete Console Output.

---

## Part 11: Understanding the Jenkins Workspace

Jenkins builds inside its own workspace, not your normal project folder.

```bash
sudo ls /var/lib/jenkins/workspace/
sudo ls /var/lib/jenkins/workspace/task-manager-build/
```

You should see the project files (`app.js`, `build.js`, `package.json`, `public`) inside the workspace directory.

Explanation to give:

> "Jenkins cloned the GitHub repository into its own workspace and executed the build commands inside that workspace."

---

## Part 12: Demonstrate Build Failure

The assignment also asks you to demonstrate a build failure. We'll deliberately rename `public/index.html`.

### Step 31 — Rename the File

```bash
cd ~/devops-task-manager
mv public/index.html public/index-backup.html
ls public
```

You should see `index-backup.html`.

### Step 32 — Commit the Change

```bash
git add .
git commit -m "Test Jenkins build failure"
git push
```

### Step 33 — Run Jenkins Build Again

Click **Build Now**. A new build (e.g. `#2`) appears. Open **Console Output**. You should see:

```
Starting application build validation...
Build Failed: public/index.html not found
Build step 'Execute shell' marked build as failure
Finished: FAILURE
```

> 📸 Take a screenshot of the failure output.

---

## Part 13: Restore the Application

### Step 34 — Rename the File Back

```bash
cd ~/devops-task-manager
mv public/index-backup.html public/index.html
ls public
```

You should see `index.html`.

### Step 35 — Push the Fix

```bash
git add .
git commit -m "Restore index.html"
git push
```

### Step 36 — Run Jenkins Again

Click **Build Now**. A new build (e.g. `#3`) appears. Console Output should show:

```
Application files validated successfully.
Build completed successfully.
Finished: SUCCESS
```

> 📸 Take a screenshot of the restored successful build.

---

## Part 14: The Two Methods You Must Show

### Method 1: Manual Build

```bash
cd ~/devops-task-manager
npm install
npm run build
```

Result:

```
Application files validated successfully.
Build completed successfully.
```

Explanation to give:

> "In the manual method, the developer manually executes every command. Whenever the application changes, the developer needs to run `npm install` and `npm run build`."

### Method 2: Automated Build

```
GitHub Repository → Jenkins retrieves source code → Jenkins Workspace → npm install → npm run build → SUCCESS
```

Explanation to give:

> "In the automated method, the commands are configured once inside Jenkins. Jenkins retrieves the source code from GitHub and automatically executes `npm install` and `npm run build`."

---

## Manual vs. Automated Comparison

| Manual | Automated Using Jenkins |
|---|---|
| Developer runs commands | Jenkins runs commands |
| Manual execution | Automated execution |
| Can be inconsistent | Consistent process |
| More manual effort | Reduced manual effort |
| Developer checks output | Jenkins records Console Output |
| Runs locally | Runs in Jenkins Workspace |

---

## Recommended Demonstration Order

1. **Show the project** — `devops-task-manager` folder with `app.js`, `build.js`, `package.json`, `public/index.html`.
2. **Show the website** — run `npm start`, open `http://localhost:3000`, demo Add/Delete Task, then stop with `Ctrl + C`.
3. **Show the manual build** — `npm install` then `npm run build`, showing `Build completed successfully.`
4. **Show GitHub** — confirm the source code is stored in your repository.
5. **Show Jenkins** — open `http://localhost:8080` and show `task-manager-build`.
6. **Show Jenkins configuration** — Source Code Management (Git), repository URL, branch `*/main`.
7. **Show the build step** — `npm install` / `npm run build`, noting these are configured once and run automatically on every build.
8. **Click Build Now** — show Jenkins cloning the repo, running `npm install` and `npm run build`, and reaching `SUCCESS`.
9. **Show Console Output** — highlight the final line, `Finished: SUCCESS`.
10. **(Optional but recommended) Show failure** — demonstrate `Finished: FAILURE`, then restore the file and show `Finished: SUCCESS` again.

---

## Screenshot Checklist

- [ ] Node.js and npm installed
- [ ] Project folder structure
- [ ] Running Student Task Manager
- [ ] Manual `npm install`
- [ ] Manual `npm run build`
- [ ] Successful manual build output
- [ ] GitHub repository
- [ ] Jenkins Dashboard
- [ ] Jenkins Freestyle Project
- [ ] GitHub configuration in Jenkins
- [ ] Build commands configuration
- [ ] Jenkins Console Output
- [ ] Jenkins `SUCCESS`
- [ ] Jenkins workspace (optional)
- [ ] Jenkins `FAILURE`
- [ ] Restored successful build

---

## Recommended Phased Approach

Don't do everything at once — work through these phases in order:

1. **Phase 1** — Generate/download the project (e.g. from Antigravity).
2. **Phase 2** — Run `npm install`, `npm start`, `npm run build` locally and confirm everything works.
3. **Phase 3** — Push the project to GitHub.
4. **Phase 4** — Install Jenkins.
5. **Phase 5** — Configure the Freestyle Project.
6. **Phase 6** — Run the automated build.
7. **Phase 7** — Demonstrate FAILURE and SUCCESS.
