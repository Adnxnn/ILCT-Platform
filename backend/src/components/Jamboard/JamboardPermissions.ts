interface JamboardPermissions {
  canEdit: boolean;
  canChat: boolean;
  canDownloadNotes: boolean;
}

interface JamboardUser {
  userId: string;
  isHost: boolean;
  permissions: JamboardPermissions;
}

class JamboardPermissionManager {
  private users: Map<string, JamboardUser> = new Map();

  setUserPermissions(userId: string, permissions: JamboardPermissions) {
    const user = this.users.get(userId);
    if (user) {
      user.permissions = permissions;
      this.users.set(userId, user);
    }
  }

  isUserAllowedToEdit(userId: string): boolean {
    const user = this.users.get(userId);
    return user ? user.permissions.canEdit : false;
  }

  isUserHost(userId: string): boolean {
    const user = this.users.get(userId);
    return user ? user.isHost : false;
  }
}