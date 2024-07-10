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
