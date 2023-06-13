import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';

@ApplyOptions<Command.Options>({
	name: 'do-something',
	description: 'BOB, DO SOMETHING!!!'
})
export class DoSomethingCommand extends Command {
	public override chatInputRun(interaction: Command.ChatInputCommandInteraction) {
		return interaction.reply({ content: "I'm doing something!", ephemeral: true });
	}

	public override registerApplicationCommands(registry: Command.Registry) {
		registry.registerChatInputCommand(
			(builder) =>
				builder //
					.setName(this.name)
					.setDescription(this.description),
			{ idHints: ['1118124940323987536'] }
		);
	}
}
