"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getPrivateMetadataAction() {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    try {
        const client = await clerkClient();
        const user = await client.users.getUser(userId);
        return {
            success: true,
            data: user.privateMetadata,
        };
    } catch (error) {
        console.error("Error fetching user metadata:", error);
        return {
            success: false,
            error: "Failed to fetch metadata from Clerk API",
        };
    }
}
