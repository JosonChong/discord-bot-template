import { WebhookClient } from 'discord.js';

export class DiscordGroup {

    name: string;

    webhookUrl: string;

    webhook: WebhookClient;

    constructor(name: string, webhookUrl: string) {
        this.name = name;
        this.webhookUrl = webhookUrl;
        this.webhook = new WebhookClient({ 
            url: webhookUrl
        });
    }

}