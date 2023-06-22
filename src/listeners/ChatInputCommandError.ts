import { ApplyOptions } from '@sapphire/decorators';
import messages from '../lib/messages';
import { Events, Listener } from '@sapphire/framework';
import type { ChatInputCommandErrorPayload, UserError } from '@sapphire/framework';

@ApplyOptions<Listener.Options>({ event: Events.ChatInputCommandError })
export class ChatInputCommandDenied extends Listener<typeof Events.ChatInputCommandError> {
	public run(error: UserError, { interaction }: ChatInputCommandErrorPayload) {
		this.container.logger.error(`Error occured on command '${interaction.commandName}': ${error}`);
		const [embed, component] = messages.error();

		if (interaction.deferred || interaction.replied) {
			return interaction.editReply({ embeds: [embed], components: [component] });
		}

		return interaction.reply({ embeds: [embed], components: [component], ephemeral: true });
	}
}
