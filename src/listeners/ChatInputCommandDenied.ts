import { ApplyOptions } from '@sapphire/decorators';
import { Events, Listener } from '@sapphire/framework';
import type { ChatInputCommandDeniedPayload, UserError } from '@sapphire/framework';

@ApplyOptions<Listener.Options>({ event: Events.ChatInputCommandDenied })
export class ChatInputCommandDenied extends Listener<typeof Events.ChatInputCommandDenied> {
	public run(error: UserError, { interaction }: ChatInputCommandDeniedPayload) {
		this.container.logger.error(`Denied usage of '${interaction.commandName}' to ${interaction.user.id}: ${error}`);
		if (interaction.deferred || interaction.replied) {
			return interaction.editReply({
				content: error.message
			});
		}

		return interaction.reply({
			content: error.message,
			ephemeral: true
		});
	}
}
