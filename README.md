# Learn-Git-and-GitHub
---

## Git vs. GitHub

* **Git:** The tool installed on your local computer that tracks changes to your files. (Think of it as "Save As..." on steroids).
* **GitHub:** The website where you upload your Git repositories to share and collaborate with others. (Think of it as Google Drive for code).

---

## 🔑 Key Terminology

| Term | Definition |
| :--- | :--- |
| **Repository (Repo)** | A project folder that contains all your project files and the revision history. |
| **Commit** | A snapshot of your changes. It's like a "save point" in a game. |
| **Branch** | A parallel version of your repository. It lets you work on features without breaking the main code. |
| **Main/Master** | The default, primary branch of your repository. This is usually the "production-ready" code. |
| **Remote** | The version of your repository hosted on the internet (e.g., on GitHub). |
| **Clone** | Downloading a copy of a repository from the internet to your computer. |
| **Pull Request (PR)** | A request to merge your changes from one branch into another (usually into `main`). |
| **Merge** | Combining the changes from one branch into another. |
| **Fork** | A personal copy of someone else's repository that lives on your account. |

---

## 💻 Commands

### Setup & Initialization
* `git init`: Turns the current folder into a new Git repository.
* `git clone [url]`: Downloads a repository from GitHub to your computer.
    * *Example:* `git clone https://github.com/user/repo.git`
* `git config --global user.name "[name]"`: Sets your name for commits.
* `git config --global user.email "[email]"`: Sets your email for commits.

### Staging & Committing
* `git status`: Lists files that have been changed but not yet saved (committed). **Use this often!**
* `git add [file]`: Prepares a file to be committed (moves it to the "Staging Area").
    * *Tip:* Use `git add .` to add **all** changed files at once.
* `git commit -m "[message]"`: Saves the staged changes with a descriptive message.
    * *Example:* `git commit -m "Fixed the login bug"`

### Sharing & Updating
* `git push`: Uploads your local commits to GitHub.
* `git pull`: Downloads the latest changes from GitHub and merges them into your local files.

### Branching
* `git branch`: Lists all your local branches.
* `git branch [name]`: Creates a new branch.
* `git checkout [name]`: Switches to a specific branch.
    * *Newer command:* `git switch [name]`
* `git merge [branch]`: Combines the specified branch into the one you are currently on.

---

## 🔄 Common Workflow

If you are working on a new feature, here is the standard loop:

1.  **Get the latest code:**
    ```bash
    git pull origin main
    ```
2.  **Create a new branch for your work:**
    ```bash
    git checkout -b new-feature
    ```
3.  **Make your changes** (edit files, write code).
4.  **Check which files changed:**
    ```bash
    git status
    ```
5.  **Add and Commit your changes:**
    ```bash
    git add .
    git commit -m "Added a new navigation bar"
    ```
6.  **Upload to GitHub:**
    ```bash
    git push origin new-feature
    ```
7.  **Go to GitHub.com** and open a **Pull Request** to merge your changes into `main`.

---

## 🆘 Help!
If you get stuck, you can always type:
```bash
git help [command]
