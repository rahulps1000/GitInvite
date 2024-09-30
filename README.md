# GitInvite

GitInvite is an open-source website that allows users to generate secure and protected GitHub repository invite links. With GitInvite, users can easily share access to their repositories with collaborators, manage access, and ensure security. The invite links are secure, making collaboration on GitHub faster and more convenient.

**Current Status:** 🚧 Beta Stage — Testing is ongoing, and more features are coming soon!

## 🔗 Features

- **Generate Invite Links**: Easily create invite links that give collaborator access to your repositories.
- **Secure and Protected**: All invite links are securely generated and protected.
- **Cancel Invite Links**: Revoke invite links anytime to prevent further use.
- **Revoke Access**: Remove collaborators who gained access through the invite links with a single click.
- **Collaborate with Ease**: No more manual additions — share a link and get collaborators on board quickly.

## 🌐 Access GitInvite Online

You can start using GitInvite directly by visiting:

[GitInvite Website]() -- deplyment pending

    1. Sign in with your GitHub account.
    2. Select a repository and generate an invite link.
    3. Share the link with your intended collaborators!
    4. Manage invite links and revoke access as needed.

## 🛠️ Deploy Locally

If you'd like to run GitInvite on your own machine, follow the steps below. GitInvite is built using Next.js.

**Prerequisites**

Make sure you have the following installed:

- Node.js (version 14.x or higher)
- Git
- A GitHub account with developer access

**Steps to Deploy Locally**

#### 1. Clone the project

```bash
  git clone https://github.com/rahulps1000/gitinvite.git
```

#### 2. Go to the project directory

```bash
  cd gitinvite
```

#### 3. Install Dependencies:

After navigating to the project directory, run the following command to install all the necessary dependencies:

```bash
  npm install
```

#### 4. Set Up Environment Variables:

You need to configure the environment variables for GitHub OAuth. An example configuration is available in the `.env.example` file. Copy this file and update the values:

```bash
  cp .env.example .env.local
```

Edit .env.local with your own values:

```bash
  GITHUB_CLIENT_ID=your_github_client_id
  GITHUB_CLIENT_SECRET=your_github_client_secret
  NEXTAUTH_SECRET=next_auth_secret_key
  NEXTAUTH_URL=next_auth_url
  MONGO_DB_URL=mongo_db_database_connection_string
  TOKEN_ENCRYPTION_SECRET=invite_token_encryption_string
```

You can obtain the GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET by registering a new OAuth application in your GitHub account.

#### 4. Run the Application:

Start the development server:

```bash
  npm run dev
```

#### 5. Access the Application:

Open your browser and go to http://localhost:3000. You can now use GitInvite locally!

## ⚠️ Beta Notice

GitInvite is currently in its beta stage, and thorough testing is still in progress. We appreciate your understanding as we continue to refine the platform.

## 🌱 Contributions and Feedback

We are actively seeking suggestions and improvements! If you have any ideas or find any issues, feel free to:

- Open a GitHub Issue (Add your issues link here).
- Submit a pull request.
- Reach out with feedback.

Your input will help shape the future of GitInvite!

## License

This project is licensed under the [GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/) License — see the LICENSE file for details.

## ✨ Acknowledgements

Special thanks to all contributors and early adopters for helping test GitInvite!
