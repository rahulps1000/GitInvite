"use server";

import { IRepo, Repos } from "@/models/Repo";
import { Octokit } from "octokit";

export async function getRepos(
  token: string,
  page: number = 0
): Promise<Repos> {
  const octokit = new Octokit({
    auth: token,
  });

  const response = await octokit.rest.repos.listForAuthenticatedUser({
    page: page,
    per_page: 100,
    affiliation: "owner",
  });
  let repos: Repos = [];
  response.data.forEach((r) => {
    if (r.permissions?.admin) {
      repos.push(r as IRepo);
    }
  });
  return repos;
}

export async function getRepo(token: string, id: string): Promise<IRepo> {
  const octokit = new Octokit({
    auth: token,
  });
  const repo = await octokit.request("GET /repositories/:id", { id });
  return repo.data as IRepo;
}

export async function inviteUser(
  token: string,
  repo_id: string,
  username: string
) {
  const octokit = new Octokit({
    auth: token,
  });
  const repo = (await getRepo(token, repo_id)) as any;
  const x = await octokit.rest.repos.addCollaborator({
    owner: repo.owner.login,
    repo: repo.name,
    username: username,
    permission: "push",
  });
  return [repo.html_url, x.data.html_url];
}

export async function acceptInvite(token: string, repo_id: string) {
  const octokit = new Octokit({
    auth: token,
  });
  const invites =
    await octokit.rest.repos.listInvitationsForAuthenticatedUser();
  const invite = invites.data.find((a) => a.repository.id === Number(repo_id))!;
  await octokit.rest.repos.acceptInvitationForAuthenticatedUser({
    invitation_id: invite.id,
  });
}

export async function revokeAccess(
  token: string,
  repo_id: string,
  username: string
) {
  const octokit = new Octokit({
    auth: token,
  });
  const repo = (await getRepo(token, repo_id)) as any;
  await octokit.rest.repos.removeCollaborator({
    owner: repo.owner.login,
    repo: repo.name,
    username: username,
  });
}
