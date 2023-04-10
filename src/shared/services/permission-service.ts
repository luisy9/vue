export class PermissionService {

    protected internalPermissions: string[] = [];
    public get permissions() {
        return this.internalPermissions;
    }

    public setPermissions(permissions: string[]) {
        this.internalPermissions = permissions || [];
    }

    public hasPermission(permission: string) {
        return this.permissions.findIndex((x) => x === permission) !== -1;
    }
}

export const permissionService = new PermissionService();