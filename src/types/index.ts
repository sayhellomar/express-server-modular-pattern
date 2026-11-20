export type Roles = "manager" | "leader" | "member";
export const userRole = {
    manager: "manager",
    leader: "leader",
    member: "member",
} as const;
