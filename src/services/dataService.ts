import { readFileSync, writeFileSync } from 'fs';
import { log } from '../utils/logUtils';
import { instanceToPlain, plainToInstance } from "class-transformer";
import { DiscordGroup } from '../models/DiscordGroup';
import { getConfigPath, getHomeFilePath } from "../utils/commonUtils";
import { User } from '../models/User';

export var discordGroups: DiscordGroup[] = [];
export var registeredUsers: Map<string, User>;

const homePath = "/../../";

function initWebhooks() {
    let fileContent = readFileSync(getConfigPath(homePath, "config.json"), { encoding: 'utf8' });
    let webhooks = JSON.parse(fileContent).webhooks;

    for (let webhook of webhooks ?? []) {
        let discordGroup = new DiscordGroup(webhook.groupName, webhook.url);
        
        discordGroups.push(discordGroup);
    }
}

async function initRegisteredUsers() {
    registeredUsers = new Map();

    try {
        let fileContent = readFileSync(getHomeFilePath(homePath, "users.json"), { encoding: 'utf8' });

        let userJsonData: Map<string, any> = JSON.parse(fileContent);

        let users = plainToInstance(User, Object.values(userJsonData));
        for (let user of users) {
            registeredUsers.set(user.userId, user);
        }
    } catch(error) {
        log("Failed to load users.");
        console.error(error);
    }
}

export async function initData() {
    initWebhooks();
    initRegisteredUsers();
}

export function getOrCreateUser(id: string, username?: string): User {
    if (!registeredUsers.has(id)) {
        let user = new User(id, username)
        registeredUsers.set(id, user);
        persistUsers();
    }

    return registeredUsers.get(id)!;
}

export function persistUsers() {
    writeFileSync(getHomeFilePath(homePath, "users.json"), JSON.stringify(instanceToPlain(registeredUsers)));
}