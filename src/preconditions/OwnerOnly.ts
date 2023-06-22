import { Precondition } from '@sapphire/framework';
import type { CommandInteraction, ContextMenuCommandInteraction, Message } from 'discord.js';

export class OwnerOnlyPrecondition extends Precondition {
	owners = process.env.OWNERS?.split(':') || [];
	public async messageRun(message: Message) {
		return this.checkOwner(message.author.id);
	}
	public async chatInputRun(interaction: CommandInteraction) {
		return this.checkOwner(interaction.user.id);
	}
	public async contextMenuRun(interaction: ContextMenuCommandInteraction) {
		return this.checkOwner(interaction.user.id);
	}

	private async checkOwner(userId: string) {
		return this.owners.includes(userId) ? this.ok() : this.error({ message: 'This command can only be used by the owner.' });
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		OwnerOnly: never;
	}
}
