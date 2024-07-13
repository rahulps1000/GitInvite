class LinkExpired extends Error {
  constructor() {
    super("The invite Link is expired");
    this.name = "LinkExpired";
  }
}
