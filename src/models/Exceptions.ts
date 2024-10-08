export class LinkExpired extends Error {
  constructor() {
    super("The invite Link is expired");
    this.name = "LinkExpired";
  }
}

export class InvalidToken extends Error {
  constructor() {
    super("The invite token is invalid");
    this.name = "InvalidToken";
  }
}

export class TamperedToken extends Error {
  constructor() {
    super("The invite token is tampered or modified");
    this.name = "TamperedToken";
  }
}

export class InviteAlreadyAccepted extends Error {
  constructor() {
    super("The invite link is already consumed");
    this.name = "InviteAlreadyAccepted";
  }
}

export class InviteLinkCancelled extends Error {
  constructor() {
    super("The invite link is cancceld by the owner");
    this.name = "InviteLinkCancelled";
  }
}
